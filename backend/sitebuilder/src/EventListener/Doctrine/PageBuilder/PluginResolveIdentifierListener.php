<?php


namespace App\EventListener\Doctrine\PageBuilder;


use App\Entity\SiteBuilder\Plugin\BasePlugin;

class PluginResolveIdentifierListener
{
    public function postLoad(BasePlugin $basePlugin){
        $basePlugin->setIdentifier();
    }
}
