<?php


namespace App\EventListener\Doctrine\PageBuilder;


use App\Entity\SiteBuilder\PaletteGridItem;
use Doctrine\ORM\EntityManagerInterface;

class PaletteGridItemListener
{
    public function __construct(private EntityManagerInterface $entityManager)
    {
    }

    public function preRemove(PaletteGridItem $paletteGridItem){
        $plugin = $paletteGridItem->getPlugin();
        if($plugin && !$plugin->getWeb()) {
            $this->entityManager->remove($plugin);
        }
    }
}
