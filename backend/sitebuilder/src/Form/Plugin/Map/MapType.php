<?php

namespace App\Form\Plugin\Map;

use App\Entity\Plugin\Map\PluginMap;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MapType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('height', NumberType::class)
            ->add('title', TextType::class)
            ->add('lat', NumberType::class)
            ->add('lng', NumberType::class)

        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginMap::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}