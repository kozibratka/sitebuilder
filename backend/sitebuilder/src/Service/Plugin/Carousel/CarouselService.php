<?php


namespace App\Service\Plugin\Carousel;


use App\Entity\SiteBuilder\Plugin\Carousel\PluginCarousel;
use App\Form\SiteBuilder\Plugin\Carousel\PluginCarouselType;
use App\Service\Plugin\PluginInterface;

class CarouselService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginCarouselType::class;
    }

    public function getEntityClass(): string
    {
        return PluginCarousel::class;
    }
}
