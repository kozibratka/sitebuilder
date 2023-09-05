<?php


namespace App\Service\Plugin\Video\VideoV1;


use App\Entity\SiteBuilder\Plugin\Image\ImageV1\ImageV1;
use App\Entity\SiteBuilder\Plugin\Video\VideoV1\VideoV1;
use App\Form\SiteBuilder\Plugin\Image\ImageV1\ImageV1Type;
use App\Form\SiteBuilder\Plugin\Video\VideoV1\VideoV1Type;
use App\Service\Plugin\PluginInterface;

class VideoV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return VideoV1Type::class;
    }

    public function getEntityClass(): string
    {
        return VideoV1::class;
    }
}
