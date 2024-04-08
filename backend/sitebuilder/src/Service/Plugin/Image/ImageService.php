<?php


namespace App\Service\Plugin\Image;


use App\Entity\Plugin\Image\PluginImage;
use App\Form\Plugin\Image\PluginImageType;
use App\Service\Plugin\PluginInterface;

class ImageService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginImageType::class;
    }

    public function getEntityClass(): string
    {
        return PluginImage::class;
    }
}
