<?php

declare(strict_types=1);

namespace App\Controller;

use App\Constant\Role;
use App\Entity\User;
use App\Entity\Web\Web;
use App\Enum\LoginTypeEnum;
use App\Enum\LoginTypeEnumType;
use App\Exception\CustomErrorMessageException;
use App\Form\UserRegistrationType;
use App\Helper\Helper;
use App\Service\Storage\UserStorageService;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

/**
 * @Route("login", name="login_")
 */
class LoginController extends BaseApiController
{

    /**
     * @Route("/registration", name="registration")
     */
    public function registration(
        Request             $request,
        MailerInterface     $mailer,
        TranslatorInterface $translator,
        RateLimiterFactory $registrationApiLimiter,
        UserService $userService
    ){
        $limiter = $registrationApiLimiter->create($request->getClientIp());
        $limiter->consume(1)->ensureAccepted();
        $form = $this->createForm(UserRegistrationType::class);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            /** @var User $user */
            $user = $form->getData();
            $userService->create($user);
            return $this->jsonResponseSimple([], 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/activation/{hash}", name="activation", methods={"GET"})
     */
    public function activation(
        Request $request,
                $hash,
        EntityManagerInterface $entityManager,
        UserStorageService $storageService,
        RateLimiterFactory $registrationApiLimiter
    ) {
        $limiter = $registrationApiLimiter->create($request->getClientIp());
        $limiter->consume(1)->ensureAccepted();
        $user = $entityManager->getRepository(User::class)->findOneBy(['hash' => $hash]);
        if ($user) {
            $user->addRole(Role::ROLE_USER);
            $entityManager->flush();
            $storageService->createStorageForNewUser($user);
            return $this->redirect($this->getParameter('app.domain').'/authorization/login/1');
        }

        throw new CustomErrorMessageException('Activation failed');
    }
    /**
     * @Route("/google", name="google", methods={"POST"})
     */
    public function loginGoogle(Request $request,
                                UserService $userService,
                                ParameterBagInterface $parameterBag,
                                EntityManagerInterface $entityManager,
                                JWTTokenManagerInterface $JWTManager
    )
    {
        $data = $request->request->all('user');
        $client = new \Google_Client(['client_id' => $parameterBag->get('app.google_login_token')]);
        if (!$client->verifyIdToken($data['idToken'])) {
            return new  CustomErrorMessageException('Token není validní');
        }
        $data = file_get_contents('https://oauth2.googleapis.com/tokeninfo?id_token='.$data['idToken']);
        $data = json_decode($data, true);
        $email = $data['email'];
        $val = LoginTypeEnum::Google;
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email, 'loginType' => LoginTypeEnum::Google]);
        if (!$user) {
            $user = new User();
            $user->setEmail($data['email']);
            $user->setFullName($data['name']);
            $userService->create($user);
            $user->setLoginAttr($data);
            $user->setLoginType(LoginTypeEnum::Google);
            $entityManager->flush();
        }

        return $this->jsonResponseSimple(['token' => $JWTManager->create($user)], 201);
    }

    /**
     * @Route("/token", name="token")
     */
    public function createToken() {
        return new JsonResponse(['yes new token']);
    }
}
