<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockAssignment;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PreUpdateEventArgs;

class PageBlockAssignmentListener
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ){
    }

    public function preUpdate(PageBlockAssignment $pageBlockAssignment, PreUpdateEventArgs $preUpdateEventArgs): void
    {
        if ($preUpdateEventArgs->hasChangedField('pageBlock')) {
            /** @var PageBlock $oldPageBlock */
            $oldPageBlock = $preUpdateEventArgs->getOldValue('pageBlock');
            if ($oldPageBlock instanceof PageBlock) {
                $count = $oldPageBlock->getPageBlockAssignments()->count();
                if (!$count && !$oldPageBlock->isShared()) {
                    $this->entityManager->remove($oldPageBlock);
                }
            }
        }
    }

    public function postRemove(PageBlockAssignment $pageBlockAssignment)
    {
        if (!$pageBlockAssignment->getPageBlock()->isShared()) {
            if ($pageBlockAssignment->getPageBlock()->isReassigned()) {
                return;
            }
            $this->entityManager->remove($pageBlockAssignment->getPageBlock());
            $this->entityManager->flush();
        }
    }
}