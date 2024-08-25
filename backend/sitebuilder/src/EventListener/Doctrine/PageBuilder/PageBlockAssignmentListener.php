<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\PageBlockAssignment;
use Doctrine\ORM\EntityManagerInterface;

class PageBlockAssignmentListener
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ){
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