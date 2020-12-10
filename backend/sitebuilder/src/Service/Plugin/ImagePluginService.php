<?php


namespace App\Service\Plugin;


use App\Form\PageBuilder\Plugin\ImagePluginType;

class ImagePluginService
{
    public function getFormClass()
    {
        return ImagePluginType::class;
    }
}
