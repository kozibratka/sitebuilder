<?php


namespace App\EventListener\Doctrine;

use App\Entity\User;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;

class UserPasswordEncodeListener
{
    private $userPasswordEncoder;

    public function __construct(UserPasswordEncoderInterface $userPasswordEncoder)
    {
        $this->userPasswordEncoder = $userPasswordEncoder;
    }

    public function prePersist(User $user)
    {
        if (!$user->getPassword()) {
            return;
        }
        $encodedPassword = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());
        $user->setPassword($encodedPassword);
    }

    public function preUpdate(User $user, PreUpdateEventArgs $event)
    {
        if (!$user->getPassword()) {
            return;
        }
        if ($event->hasChangedField('password')) {
            $encodedPassword = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());
            $user->setPassword($encodedPassword);
        }
    }
}
