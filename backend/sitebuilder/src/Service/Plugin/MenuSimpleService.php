<?php


namespace App\Service\Plugin;



use App\Entity\SiteBuilder\Plugin\MenuSimple\MenuSimple;
use App\Form\SiteBuilder\Plugin\MenuSimpleType\MenuSimpleType;

class MenuSimpleService implements PluginInterface
{
    public function getFormClass(): string
    {
        return MenuSimpleType::class;
    }

    public function getEntityClass(): string
    {
        return MenuSimple::class;
    }
}
