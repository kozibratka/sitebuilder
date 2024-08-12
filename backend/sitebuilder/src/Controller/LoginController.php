<?php

declare(strict_types=1);

namespace App\Controller;

use App\Constant\Limit;
use App\Constant\Role;
use App\Entity\ResetPassword;
use App\Entity\User;
use App\Enum\LoginTypeEnum;
use App\Exception\CustomErrorMessageException;
use App\Form\LoginRegistration\ResendPasswordLinkType;
use App\Form\LoginRegistration\UserRegistrationType;
use App\Service\Storage\UserStorageService;
use App\Service\UserService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
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
        $form = $this->createForm(UserRegistrationType::class, null, ['validation_groups' => ['Default', 'FORM']]);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            /** @var User $user */
            $user = $form->getData();
            $userService->create($user); // Activation email is better - after create storage...
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
     * @Route("/social", name="social", methods={"POST"})
     */
    public function loginSocial(Request $request,
                                UserService $userService,
                                ParameterBagInterface $parameterBag,
                                EntityManagerInterface $entityManager,
                                JWTTokenManagerInterface $JWTManager,
                                UserStorageService $storageService,
    )
    {
        $data = $request->request->all('user');
        $type = $request->request->get('type');
        $type = LoginTypeEnum::from($type);
        if ($type == LoginTypeEnum::Google) {
            $client = new \Google_Client(['client_id' => $parameterBag->get('app.google_login_token')]);
            if (!$client->verifyIdToken($data['idToken'])) {
                return new  CustomErrorMessageException('Token není validní');
            }
            $data = file_get_contents('https://oauth2.googleapis.com/tokeninfo?id_token='.$data['idToken']);
            $data = json_decode($data, true);
        } elseif ($type == LoginTypeEnum::Facebook) {
            $data = file_get_contents('https://graph.facebook.com/me?fields=email,name&access_token='.$data['authToken']);
            $data = json_decode($data, true);
        }
        $email = $data['email'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email, 'loginType' => $type]);
        if (!$user) {
            $user = new User();
            $user->setEmail($data['email']);
            $user->setFullName($data['name']);
            $user->setLoginAttr($data);
            $user->setLoginType($type);
            $userService->create($user);
        }

        return $this->jsonResponseSimple(['token' => $JWTManager->create($user)], 201);
    }

    /**
     * @Route("/token", name="token")
     */
    public function createToken() {
        return new JsonResponse(['yes new token']);
    }

    #[Route('/send-link-reset-password', name: 'link_reset_password')]

    public function sendLinkResetPassword(
        Request $request,
        EntityManagerInterface $entityManager,
        TranslatorInterface $translator,
        MailerInterface $mailer
    )
    {
        $form = $this->createForm(ResendPasswordLinkType::class, null, ['validation_groups' => ['email']]);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            $data = $form->getData();
            /** @var User $user */
            $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $data->getEmail(), 'loginType' => LoginTypeEnum::Form]);
            if ($user) {
                $resetPassword = new ResetPassword();
                $user->addResetPassword($resetPassword);
                if ($user->getResetPasswords()->count() > Limit::RESET_PASSWORD_ATTEMPTS) {
                    throw new CustomErrorMessageException('Překročen limit pokusů obnovy hesla');
                }

                $email = (new TemplatedEmail())
                ->from($this->getParameter('app.email_no_reply'))
                ->to(new Address($user->getEmail()))
                ->subject($translator->trans('Password recovery'))
                ->htmlTemplate('email/LoginRegistration/password_reset_link.html.twig')
                ->context([
                    'hash' => $resetPassword->getHashId(),
                ]);
                $entityManager->flush();
                $mailer->send($email);
                return $this->jsonResponseSimple();
            }
            throw new CustomErrorMessageException('Email nenalezen');
        }
    }
}
