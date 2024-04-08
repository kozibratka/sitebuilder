<?php


namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\Plugin\BasePlugin;

class BasePluginListener
{
    public function prePersist(BasePlugin $basePlugin){
//        if($basePlugin->getName() && !$basePlugin->getWeb()) {
//            $basePlugin->setWeb($basePlugin->getPaletteGridItems()->first()->getPageBlock()->getPage()->getWeb());
//        }
    }

    public function preUpdate(BasePlugin $basePlugin){
        if(!$basePlugin->getName()) {
            $basePlugin->setWeb(null);
        }
    }

}
