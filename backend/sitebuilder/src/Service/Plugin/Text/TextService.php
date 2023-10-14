<?php

namespace App\Service\Plugin\Text;

use App\Entity\SiteBuilder\Plugin\Text\PluginText;
use App\Form\SiteBuilder\Plugin\Text\PluginTextType;
use App\Service\Plugin\PluginInterface;

class TextService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginTextType::class;
    }

    public function getEntityClass(): string
    {
        return PluginText::class;
    }
}
