<?php


namespace App\Security\Voter\PageBuilder;


use App\Entity\SiteBuilder\PaletteGridItem;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
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
            case $subject instanceof PaletteGridItem:
                $user = $subject->getPageBlock()->getUser();
                break;
            case $subject instanceof BasePlugin:
                $user = $subject->getUser();
                break;
        }
        if($userLogged === $user || !$user) {
            return true;
        }
        return false;
    }
}
