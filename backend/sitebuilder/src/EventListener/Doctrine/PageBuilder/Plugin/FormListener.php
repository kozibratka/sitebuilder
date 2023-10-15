<?php


namespace App\EventListener\Doctrine\PageBuilder\Plugin;


use App\Entity\SiteBuilder\Plugin\Form\PluginForm;
use Nzo\UrlEncryptorBundle\Encryptor\Encryptor;

class FormListener
{

    public function __construct(private Encryptor $encryptor)
    {
    }

    public function postLoad(PluginForm $pluginForm){
        $pluginForm->setHashId($this->encryptor->encrypt($pluginForm->getId()));
    }
}
