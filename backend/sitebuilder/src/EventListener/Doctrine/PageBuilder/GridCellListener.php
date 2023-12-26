<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\GridCell;
use Doctrine\ORM\EntityManagerInterface;

class GridCellListener
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ){
    }

    public function preRemove(GridCell $gridCell){
        foreach($gridCell->getItems() as $gridCellItem) {
            $this->entityManager->remove($gridCellItem);
        }
    }
}