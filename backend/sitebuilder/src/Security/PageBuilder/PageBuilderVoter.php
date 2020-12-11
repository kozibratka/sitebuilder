<?php


namespace App\Security\PageBuilder;


use App\Entity\PageBuilder\GridstackItem;
use App\Entity\PageBuilder\Page;
use App\Entity\PageBuilder\PageBlock;
use App\Entity\PageBuilder\Plugin\BasePlugin;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

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
        $user = null;
        switch (true) {
            case $subject instanceof Page:
                $user = $subject->getUser();
                break;
            case $subject instanceof PageBlock:
                $user = $subject->getUser();

                break;
            case $subject instanceof GridstackItem:
                $user = $subject->getPageBlock()->getUser();
                break;
            case $subject instanceof BasePlugin:
                $user = $subject->getUser();
                break;
        }
        if($token->getUser() === $user || !$user) {
            return true;
        }
        return false;
    }
}
