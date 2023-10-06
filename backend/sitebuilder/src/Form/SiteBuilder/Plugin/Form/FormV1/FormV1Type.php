<?php

namespace App\Form\SiteBuilder\Plugin\Form\FormV1;

use App\Entity\SiteBuilder\Plugin\Form\FormV1\FormV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use App\Form\Type\JsonType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FormV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('email')
            ->add('form', JsonType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FormV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
