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
use App\Form\LoginRegistration\ResetPasswordType;
use App\Form\LoginRegistration\UserRegistrationType;
use App\Service\Storage\UserStorageService;
use App\Service\UserService;
use Carbon\Carbon;
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
        $form = $this->createForm(UserRegistrationType::class, null, ['validation_groups' => ['Default', 'FORM']]);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            $registrationApiLimiter->create($request->getClientIp().'registration')->consume(1)->ensureAccepted();
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
    ) {
        if (!$hash) {
            throw new CustomErrorMessageException('Activation failed');
        }
        $user = $entityManager->getRepository(User::class)->findOneBy(['hash' => $hash]);
        if ($user) {
            $user->addRole(Role::ROLE_USER);
            $user->setHash('');
            $entityManager->flush();
            $storageService->createStorageForNewUser($user);
            return $this->jsonResponseSimple();
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
                                RateLimiterFactory $registrationApiLimiter,
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
        if (!isset($data['email']) || !$data['email']) {
            throw new CustomErrorMessageException('Activation failed');
        }
        $email = $data['email'];
        $user = $entityManager->getRepository(User::class)->findOneBy(['email' => $email, 'loginType' => $type]);
        if (!$user) {
            $registrationApiLimiter->create($request->getClientIp().'login_social')->consume(2)->ensureAccepted();
            $user = new User();
            $user->setEmail($data['email']);
            $user->setFullName($data['name']);
            $user->setLoginAttr($data);
            $user->setLoginType($type);
            $userService->create($user, true);
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
        MailerInterface $mailer,
        RateLimiterFactory $registrationApiLimiter,
    )
    {
        $limiter = $registrationApiLimiter->create($request->getClientIp().'send_password_link');
        $limiter->consume(1)->ensureAccepted();
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
                    'link' => $this->getParameter('app.domain').'/authorization/reset-password/'.$resetPassword->getHashId(),
                ]);
                $entityManager->flush();
                $mailer->send($email);
                return $this->jsonResponseSimple();
            }
            throw new CustomErrorMessageException('Email nenalezen');
        } else {
            return $this->invalidFormResponse($form);
        }
    }

    #[Route('/reset-password/{hash}', name: 'reset_password')]
    public function resetPassword(
        $hash,
        Request $request,
        EntityManagerInterface $entityManager,
        RateLimiterFactory $registrationApiLimiter,
    )
    {
        $registrationApiLimiter->create($request->getClientIp().'reset_password')->consume(1)->ensureAccepted();
        $resetPassword = $entityManager->getRepository(ResetPassword::class)->findOneBy(['hashId' => $hash]);
        if ($resetPassword) {
            if ($resetPassword->getCreatedAt() < Carbon::now()->subMinutes(30)) {
                throw new CustomErrorMessageException('Odkaz expiroval');
            }
        } else {
            throw new CustomErrorMessageException('Obnova hesla se nezdařila');
        }
        $form = $this->createForm(ResetPasswordType::class, $resetPassword->getUser(), ['validation_groups' => ['password']]);
        if ($request->isMethod('POST')) {
            $form->submit($request->request->all());
        }
        if ($form->isSubmitted()) {
            if ($form->isValid()) {
                $entityManager->flush();
            } else {
                return $this->invalidFormResponse($form);
            }
        }

        return $this->jsonResponseSimple();
    }
}
