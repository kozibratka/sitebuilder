<?php

namespace App\Service\Plugin\Gallery;

use App\Entity\Plugin\Gallery\PluginGallery;
use App\Form\Plugin\Gallery\PluginGalleryType;
use App\Service\Plugin\PluginInterface;

class GalleryService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginGalleryType::class;
    }

    public function getEntityClass(): string
    {
        return PluginGallery::class;
    }
}