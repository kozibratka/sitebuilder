<?php


namespace App\Security;


use App\Entity\PageBuilder\GridstackItem;
use App\Entity\PageBuilder\Page;
use App\Entity\PageBuilder\PageBlock;
use App\Entity\PageBuilder\Plugin\BasePlugin;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

class PageBuilderVoter extends Voter
{
    private EntityManagerInterface $entityManager;

    public function __construct(EntityManagerInterface $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    protected function supports(string $attribute, $subject): bool
    {
        if($attribute === 'page_builder_voter') {
            return true;
        }
        return false;
    }

    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token)
    {
        $user = null;
        switch (true) {
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
