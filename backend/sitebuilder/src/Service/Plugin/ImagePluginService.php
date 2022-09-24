<?php


namespace App\Service\Plugin;


use App\Entity\SiteBuilder\Plugin\ImagePlugin;
use App\Form\SiteBuilder\Plugin\ImagePluginType;

class ImagePluginService implements PluginInterface
{
    public function getFormClass(): string
    {
        return ImagePluginType::class;
    }

    public function getEntityClass(): string
    {
        return ImagePlugin::class;
    }
}
