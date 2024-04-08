<?php

namespace App\Service\Plugin\Menu;

use App\Entity\Plugin\Menu\PluginMenu;
use App\Form\Plugin\Menu\PluginMenuType;
use App\Service\Plugin\PluginInterface;

class MenuService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginMenuType::class;
    }

    public function getEntityClass(): string
    {
        return PluginMenu::class;
    }
}
