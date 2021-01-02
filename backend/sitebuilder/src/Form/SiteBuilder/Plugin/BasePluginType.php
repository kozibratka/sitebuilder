<?php

namespace App\Form\SiteBuilder\Plugin;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BasePluginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('id', null, ['required' => false])
            ->add('identifier')
            ->add('pluginType', TextType::class, ['mapped' => false])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
//        $resolver->setDefaults([
//            'inherit_data' => true,
//        ]);
    }
}
