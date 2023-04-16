<?php


namespace App\Service\Plugin\Carousel\CarouselV1;


use App\Entity\SiteBuilder\Plugin\Carousel\CarouselV1\CarouselV1;
use App\Form\SiteBuilder\Plugin\Carousel\CarouselV1\CarouselV1Type;
use App\Service\Plugin\PluginInterface;

class CarouselV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return CarouselV1Type::class;
    }

    public function getEntityClass(): string
    {
        return CarouselV1::class;
    }
}
