<?php


namespace App\EventListener\Doctrine\PageBuilder;


use App\Entity\Plugin\BasePlugin;

class PluginResolveIdentifierListener
{
    public function postLoad(BasePlugin $basePlugin){
        $basePlugin->setIdentifier();
    }
}
