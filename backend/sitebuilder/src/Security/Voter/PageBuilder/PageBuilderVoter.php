<?php


namespace App\Security\Voter\PageBuilder;


use App\Entity\Page;
use App\Entity\Plugin\BasePlugin;
use App\Entity\SiteBuilder\GridCell;
use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\GridRow;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\Web\Web;
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
                $user = $subject->getWeb()->getUser();
                break;
            case $subject instanceof PageBlock:
                $user = $subject->getPage()->getWeb()->getUser();
                break;
            case $subject instanceof GridRow:
                $user = $subject->getPageBlock()->getPage()->getWeb()->getUser();
                break;
            case $subject instanceof GridCell:
                $user = $subject->getRow()->getPageBlock()->getPage()->getWeb()->getUser();
                break;
            case $subject instanceof GridCellItem:
                $user = $subject->getCell()->getRow()->getPageBlock()->getPage()->getWeb()->getUser();
                break;
            case $subject instanceof BasePlugin:
                $user = $subject->getWeb()?->getUser() ?? $subject->getItems()->get(0)?->getCell()->getRow()->getPageBlock()->getPage()->getWeb()->getUser();
                break;
        }
        if($userLogged === $user || !$user) {
            return true;
        }
        return false;
    }
}
