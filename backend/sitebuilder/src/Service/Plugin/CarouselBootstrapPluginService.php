<?php


namespace App\Service\Plugin;


use App\Entity\SiteBuilder\Plugin\CarouselBootstrapPlugin;
use App\Form\SiteBuilder\Plugin\CarouselBootstrapType\CarouselBootstrapType;

class CarouselBootstrapPluginService implements PluginInterface
{
    public function getFormClass(): string
    {
        return CarouselBootstrapType::class;
    }

    public function getEntityClass(): string
    {
        return CarouselBootstrapPlugin::class;
    }
}
