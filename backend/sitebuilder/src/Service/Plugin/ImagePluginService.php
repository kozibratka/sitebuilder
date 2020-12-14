<?php


namespace App\Service\Plugin;


use App\Form\SiteBuilder\Plugin\ImagePluginType;

class ImagePluginService
{
    public function getFormClass()
    {
        return ImagePluginType::class;
    }
}
