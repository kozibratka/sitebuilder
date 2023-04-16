<?php

namespace App\Service\Plugin\Menu\MenuV1Service;

use App\Entity\SiteBuilder\Plugin\Menu\MenuV1\MenuV1;
use App\Form\SiteBuilder\Plugin\Menu\MenuV1Type\MenuV1Type;
use App\Service\Plugin\PluginInterface;

class MenuV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return MenuV1Type::class;
    }

    public function getEntityClass(): string
    {
        return MenuV1::class;
    }
}
