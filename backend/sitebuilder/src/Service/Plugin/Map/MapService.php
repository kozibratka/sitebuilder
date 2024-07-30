<?php

namespace App\Service\Plugin\Map;

use App\Entity\Plugin\Map\PluginMap;
use App\Form\Plugin\Map\MapType;
use App\Service\Plugin\PluginInterface;

class MapService implements PluginInterface
{
    public function getFormClass(): string
    {
        return MapType::class;
    }

    public function getEntityClass(): string
    {
        return PluginMap::class;
    }
}
