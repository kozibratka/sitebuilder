<?php

namespace App\Service\Plugin;

use App\Entity\SiteBuilder\Plugin\TextPlugin;
use App\Form\SiteBuilder\Plugin\TextPluginType;

class TextPluginService implements PluginInterface
{
    public function getFormClass(): string
    {
        return TextPluginType::class;
    }

    public function getEntityClass(): string
    {
        return TextPlugin::class;
    }
}
