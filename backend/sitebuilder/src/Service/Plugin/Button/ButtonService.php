<?php

namespace App\Service\Plugin\Button;

use App\Entity\Plugin\Button\PluginButton;
use App\Form\Plugin\Button\ButtonType;
use App\Service\Plugin\PluginInterface;

class ButtonService implements PluginInterface
{
    public function getFormClass(): string
    {
        return ButtonType::class;
    }

    public function getEntityClass(): string
    {
        return PluginButton::class;
    }
}
