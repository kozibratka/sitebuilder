<?php


namespace App\Service\Plugin\Video;


use App\Entity\Plugin\Video\PluginVideo;
use App\Form\Plugin\Video\PluginVideoType;
use App\Service\Plugin\PluginInterface;

class VideoService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginVideoType::class;
    }

    public function getEntityClass(): string
    {
        return PluginVideo::class;
    }
}
