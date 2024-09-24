<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\Plugin\BasePlugin;
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
        if ($plugin->isReasigned()) {
            return;
        }
        if($plugin && !$plugin->getWeb()) {
            $this->entityManager->remove($plugin);
        } elseif ($plugin) {
            $plugin->removeGridCellItem($gridCellItem);
        }
    }

    public function preUpdate(GridCellItem $gridCellItem, PreUpdateEventArgs $event): void
    {
        if($event->hasChangedField('plugin')) {
            /** @var BasePlugin $oldPlugin */
            $oldPlugin = $event->getOldValue('plugin');
            if ($oldPlugin && $gridCellItem->getPlugin()->getWeb() && !$oldPlugin->getWeb() && !$oldPlugin->isReasigned()) {
                $this->entityManager->remove($oldPlugin);
            }
        }
    }
}