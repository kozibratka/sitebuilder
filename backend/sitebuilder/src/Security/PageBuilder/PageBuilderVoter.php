<?php


namespace App\Security\PageBuilder;


use App\Entity\SiteBuilder\GridstackItem;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
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
            case $subject instanceof Web:
                $user = $subject->getUser();
                break;
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
