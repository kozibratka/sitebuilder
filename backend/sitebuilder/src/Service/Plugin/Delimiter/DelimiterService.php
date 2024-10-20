<?php

namespace App\Service\Plugin\Delimiter;

use App\Entity\Plugin\Delimiter\PluginDelimiter;
use App\Form\Plugin\Delimiter\DelimiterType;
use App\Service\Plugin\PluginInterface;

class DelimiterService implements PluginInterface
{
    public function getFormClass(): string
    {
        return DelimiterType::class;
    }

    public function getEntityClass(): string
    {
        return PluginDelimiter::class;
    }
}