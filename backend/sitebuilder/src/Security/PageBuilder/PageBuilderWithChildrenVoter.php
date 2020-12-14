<?php


namespace App\Security\PageBuilder;


use App\Entity\SiteBuilder\GridstackItem;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class PageBuilderWithChildrenVoter extends Voter
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if($attribute !== 'page_builder_with_children_voter') {
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
                foreach ($subject->getPages() as $page) {
                    $result = $this->voteOnAttribute($attribute, $page, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof Page:
                $user = $subject->getUser();
                foreach ($subject->getPageBlocks() as $pageBlock) {
                    $result = $this->voteOnAttribute($attribute, $pageBlock, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof PageBlock:
                $user = $subject->getUser();
                foreach ($subject->getGridstackItems() as $gridstackItem) {
                    $result = $this->voteOnAttribute($attribute, $gridstackItem, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof GridstackItem:
                $user = $subject->getPageBlock()->getUser();
                $result = $this->voteOnAttribute($attribute, $subject->getPlugin(), $token);
                if(!$result) {
                    return false;
                }
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
