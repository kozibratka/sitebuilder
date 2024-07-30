<?php

namespace App\Service\Plugin\Icon;

use App\Entity\Plugin\Icon\PluginIcon;
use App\Form\Plugin\Icon\IconType;
use App\Service\Plugin\PluginInterface;

class IconService implements PluginInterface
{
    public function getFormClass(): string
    {
        return IconType::class;
    }

    public function getEntityClass(): string
    {
        return PluginIcon::class;
    }
}
