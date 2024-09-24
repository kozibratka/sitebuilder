<?php

namespace App\Form\Plugin;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class BasePluginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->add('id', null, ['mapped' => false])
            ->add('identifier')
            ->add('name')
            ->add('horizontalMargin', NumberType::class)
            ->add('isShared', CheckboxType::class, ['required' => false])
            ->add('paddingBottom', NumberType::class)
            ->add('paddingTop', NumberType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'allow_extra_fields' => true,
        ]);
    }
}
