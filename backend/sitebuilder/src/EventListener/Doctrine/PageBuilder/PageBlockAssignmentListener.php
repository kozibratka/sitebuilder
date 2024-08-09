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
            $this->entityManager->remove($pageBlockAssignment->getPageBlock());
            $this->entityManager->flush();
        }
    }
}