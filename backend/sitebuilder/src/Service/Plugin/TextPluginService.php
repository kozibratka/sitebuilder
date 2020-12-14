<?php

namespace App\Service\Plugin;

use App\Form\SiteBuilder\Plugin\TextPluginType;

class TextPluginService
{
    public function getFormClass()
    {
        return TextPluginType::class;
    }
}
