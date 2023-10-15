<?php


namespace App\EventListener\Doctrine;

use App\Entity\User;
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
        $encodedPassword = $this->userPasswordEncoder->encodePassword($user, $user->getPassword());
        $user->setPassword($encodedPassword);
    }
}
