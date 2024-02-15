<?php

namespace App\Form\SiteBuilder;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;

class PageBlockTemplateType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('block', PageBlockType::class,['is_preview' => true, 'web' => true]) //is_preview - ignore plugin id sync
            //->add('image', FileType::class)
            ;
    }
}