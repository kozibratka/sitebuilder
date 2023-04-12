<?php


namespace App\Service\Plugin;



use App\Entity\SiteBuilder\Plugin\MenuSimple\MenuSimple;
use App\Form\SiteBuilder\Plugin\MenuSimpleType\MenuSimpleItemType;

class MenuSimpleService implements PluginInterface
{
    public function getFormClass(): string
    {
        return MenuSimpleItemType::class;
    }

    public function getEntityClass(): string
    {
        return MenuSimple::class;
    }
}
