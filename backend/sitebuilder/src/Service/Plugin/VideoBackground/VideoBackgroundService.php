<?php

namespace App\Service\Plugin\VideoBackground;

use App\Entity\Plugin\VideoBackground\PluginVideoBackground;
use App\Form\Plugin\VideoBackground\VideoBackgroundType;
use App\Service\Plugin\PluginInterface;

class VideoBackgroundService implements PluginInterface
{
    public function getFormClass(): string
    {
        return VideoBackgroundType::class;
    }

    public function getEntityClass(): string
    {
        return PluginVideoBackground::class;
    }
}