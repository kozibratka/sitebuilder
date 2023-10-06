<?php


namespace App\Service\Plugin\Form\FormV1;


use App\Entity\SiteBuilder\Plugin\Form\FormV1\FormV1;
use App\Form\SiteBuilder\Plugin\Form\FormV1\FormV1Type;
use App\Service\Plugin\PluginInterface;

class FormV1Service implements PluginInterface
{
    public function getFormClass(): string
    {
        return FormV1Type::class;
    }

    public function getEntityClass(): string
    {
        return FormV1::class;
    }
}
