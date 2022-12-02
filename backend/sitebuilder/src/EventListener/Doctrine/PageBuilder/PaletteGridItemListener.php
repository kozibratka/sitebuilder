<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\PaletteGridItem;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\Event\LifecycleEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;

class PaletteGridItemListener
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function preRemove(LifecycleEventArgs $args){
        $plugin = $args->getObject()->getPlugin();
        if($plugin && !$plugin->getWeb()) {
            $this->entityManager->remove($plugin);
        }
    }

    public function preUpdate(PreUpdateEventArgs $event): void
    {
        /** @var PaletteGridItem $paletteGridItem */
        $paletteGridItem = $event->getObject();
        if($event->hasChangedField('plugin')) {
            $oldPlugin = $event->getOldValue('plugin');
            if ($paletteGridItem->getPlugin()->getWeb() && !$oldPlugin->getWeb()) {
                $this->entityManager->remove($oldPlugin);
                $this->entityManager->flush();
            }
        }
    }
}
