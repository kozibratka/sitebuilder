<?php

namespace App\Service;

use App\Entity\User;
use App\Entity\Web\Web;
use App\Helper\Helper;
use App\Service\Storage\UserStorageService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;

class UserService
{
    public function __construct(
        private ParameterBagInterface $parameterBag,
        private EntityManagerInterface $entityManager,
        private UserStorageService $userStorageService,
    )
    {
    }

    public function create(User $user, $withStorage = true)
    {
//        $newWeb = (new Web())->setName('Můj nový web '.(new \DateTime())->format($this->parameterBag->get('app.date_time_format')));
//        $user->addWeb($newWeb);
        $hash = Helper::randomString(20);
        $user->setHash($hash);
        $user->addRole('ROLE_USER'); // default empty, activation email set role!!!
//            $email = (new TemplatedEmail())
//                ->from($this->getParameter('app.email_no_reply'))
//                ->to(new Address($user->getEmail()))
//                ->subject($translator->trans('New Registration account'))
//                ->htmlTemplate('email/account_activation.html.twig')
//                ->context([
//                    'hash' => $hash,
//                ]);
//            $mailer->send($email);

        $this->entityManager->persist($user);
        $this->entityManager->flush();
        if ($withStorage) {
            $this->userStorageService->createStorageForNewUser($user);
        }
    }
}