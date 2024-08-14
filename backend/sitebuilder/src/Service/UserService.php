<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Web\Web;
use App\Helper\Helper;
use App\Service\Storage\UserStorageService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserService
{
    public function __construct(
        private ParameterBagInterface $parameterBag,
        private EntityManagerInterface $entityManager,
        private UserStorageService $userStorageService,
        private TranslatorInterface $translator,
        private MailerInterface $mailer
    )
    {
    }

    public function create(User $user, $withStorage = true)
    {
        $hash = Helper::randomString(20);
        $user->setHash($hash);
            $email = (new TemplatedEmail())
                ->from($this->parameterBag->get('app.email_no_reply'))
                ->to(new Address($user->getEmail()))
                ->subject($this->translator->trans('New Registration account'))
                ->htmlTemplate('email/LoginRegistration/account_activation.html.twig')
                ->context([
                    'link' => $this->parameterBag->get('app.domain').'/authorization/activation/'.$hash,
                ]);
            $this->mailer->send($email);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        if ($withStorage) {
            $this->userStorageService->createStorageForNewUser($user);
        }
    }
}