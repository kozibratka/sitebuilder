<?php

namespace App\Service\Plugin\Text;

use App\Entity\Plugin\Text\PluginText;
use App\Form\Plugin\Text\PluginTextType;
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
