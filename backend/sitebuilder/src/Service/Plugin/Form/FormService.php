<?php


namespace App\Service\Plugin\Form;


use App\Entity\SiteBuilder\Plugin\Form\PluginForm;
use App\Form\SiteBuilder\Plugin\Form\PluginFormType;
use App\Service\Plugin\PluginInterface;

class FormService implements PluginInterface
{
    public function getFormClass(): string
    {
        return PluginFormType::class;
    }

    public function getEntityClass(): string
    {
        return PluginForm::class;
    }
}
