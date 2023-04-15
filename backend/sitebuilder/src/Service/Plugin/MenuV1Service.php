<?php

namespace App\Service\Plugin;

use App\Entity\SiteBuilder\Plugin\MenuV1\MenuV1;
use App\Form\SiteBuilder\Plugin\MenuV1Type\MenuV1Type;

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
