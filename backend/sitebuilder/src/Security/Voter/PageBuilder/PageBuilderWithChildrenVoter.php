<?php

namespace App\Security\Voter\PageBuilder;

use App\Entity\Page\Page;
use App\Entity\Plugin\BasePlugin;
use App\Entity\SiteBuilder\GridCell;
use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\GridRow;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockAssignment;
use App\Entity\Web\Web;
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
                foreach ($subject->getPageBlockAssignments() as $pageBlock) {
                    $result = $this->voteOnAttribute($attribute, $pageBlock, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof PageBlockAssignment:
                $user = $subject->getUser();
                foreach ($subject->getPageBlock() as $pageBlock) {
                    $result = $this->voteOnAttribute($attribute, $pageBlock, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof PageBlock:
                $user = $subject->getUser();
                foreach ($subject->getPaletteGridItems() as $paletteGridItem) {
                    $result = $this->voteOnAttribute($attribute, $paletteGridItem, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof GridCellItem:
                $user = $subject->getUser();
                $result = $this->voteOnAttribute($attribute, $subject->getPlugin(), $token);
                if(!$result) {
                    return false;
                }
                break;
            case $subject instanceof GridRow:
                $user = $subject->getUser();
                foreach ($subject->getCells() as $cell) {
                    $result = $this->voteOnAttribute($attribute, $cell, $token);
                    if(!$result) {
                        return false;
                    }
                }
                break;
            case $subject instanceof GridCell:
                $user = $subject->getUser();
                foreach ($subject->getItems() as $item) {
                    $result = $this->voteOnAttribute($attribute, $item, $token);
                    if(!$result) {
                        return false;
                    }
                }
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
