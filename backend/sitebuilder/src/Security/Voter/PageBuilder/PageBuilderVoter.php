<?php


namespace App\Security\Voter\PageBuilder;

use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class PageBuilderVoter extends Voter
{
    protected function supports(string $attribute, $subject): bool
    {
        if($attribute !== 'page_builder_voter') {
            return false;
        }
        return true;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        return $this->check($subject, $token->getUser());
    }

    public function check($subject, UserInterface $userLogged) {
        $user = $subject->getUser();
        if($userLogged === $user || !$user) {
            return true;
        }
        return false;
    }
}
