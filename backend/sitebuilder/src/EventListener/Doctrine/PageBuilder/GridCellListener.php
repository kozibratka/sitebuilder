<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\GridCell;
use App\Entity\SiteBuilder\GridCellItem;
use Doctrine\ORM\EntityManagerInterface;

class GridCellListener
{
    public function __construct(
        private EntityManagerInterface $entityManager
    ){
    }

    public function preRemove(GridCell $gridCell){
        /** @var GridCellItem $gridCellItem */
        foreach($gridCell->getItems() as $gridCellItem) {
            if (!$gridCellItem->isReasigned()) {
                $this->entityManager->remove($gridCellItem);
            }
        }
    }
}