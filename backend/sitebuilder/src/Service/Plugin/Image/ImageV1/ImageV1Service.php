<?php


namespace App\Service\Plugin\Image\ImageV1;


use App\Entity\SiteBuilder\Plugin\Image\ImageV1\ImageV1;
use App\Form\SiteBuilder\Plugin\Image\ImageV1\ImageV1Type;
use App\Service\Plugin\PluginInterface;

class ImageV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return ImageV1Type::class;
    }

    public function getEntityClass(): string
    {
        return ImageV1::class;
    }
}
