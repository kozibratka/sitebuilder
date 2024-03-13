<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\GridCellItem;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\PreUpdateEventArgs;

class GridCellItemListener
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function preRemove(GridCellItem $gridCellItem){
        $plugin = $gridCellItem->getPlugin();
        if($plugin && !$plugin->getWeb()) {
            $this->entityManager->remove($plugin);
        } elseif ($plugin) {
            $plugin->removeGridCellItem($gridCellItem);
        }
    }

    public function preUpdate(GridCellItem $gridCellItem, PreUpdateEventArgs $event): void
    {
        if($event->hasChangedField('plugin')) {
            $oldPlugin = $event->getOldValue('plugin');
            if ($gridCellItem->getPlugin()->getWeb() && !$oldPlugin->getWeb()) {
                $this->entityManager->remove($oldPlugin);
            }
        }
    }
}