<?php

declare(strict_types=1);

namespace App\Controller;

use App\Constant\Role;
use App\Entity\User;
use App\Entity\Web\Web;
use App\Exception\CustomErrorMessageException;
use App\Form\UserRegistrationType;
use App\Helper\Helper;
use App\Service\Storage\UserStorageService;
use Doctrine\ORM\EntityManagerInterface;
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
        RateLimiterFactory $registrationApiLimiter
    ){
        $limiter = $registrationApiLimiter->create($request->getClientIp());
        $limiter->consume(1)->ensureAccepted();
        $form = $this->createForm(UserRegistrationType::class);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            /** @var User $user */
            $user = $form->getData();
            $newWeb = (new Web())->setName('Můj nový web '.(new \DateTime())->format($this->getParameter('app.date_time_format')));
            $user->addWeb($newWeb);
            $hash = Helper::randomString(20);
            $user->setHash($hash);
            $user->addRole('ROLE_USER'); // default empty, activation email set role!!!

            $this->persist($user);
//            $email = (new TemplatedEmail())
//                ->from($this->getParameter('app.email_no_reply'))
//                ->to(new Address($user->getEmail()))
//                ->subject($translator->trans('New Registration account'))
//                ->htmlTemplate('email/account_activation.html.twig')
//                ->context([
//                    'hash' => $hash,
//                ]);
//            $mailer->send($email);
            return $this->jsonResponseSimple($newWeb->getId(), 201);
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
     * @Route("/token", name="token")
     */
    public function createToken() {
        return new JsonResponse(['yes new token']);
    }
}
