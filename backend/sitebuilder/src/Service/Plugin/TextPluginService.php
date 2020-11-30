<?php

namespace App\Service\Plugin;

use App\Form\PageBuilder\Plugin\TextPluginType;

class TextPluginService
{
    public function getFormClass()
    {
        return TextPluginType::class;
    }
}
