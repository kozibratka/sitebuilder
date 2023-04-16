<?php

namespace App\Service\Plugin\Text\TextV1;

use App\Entity\SiteBuilder\Plugin\Text\TextV1\TextV1;
use App\Form\SiteBuilder\Plugin\Text\TextV1\TextV1Type;
use App\Service\Plugin\PluginInterface;

class TextV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return TextV1Type::class;
    }

    public function getEntityClass(): string
    {
        return TextV1::class;
    }
}
