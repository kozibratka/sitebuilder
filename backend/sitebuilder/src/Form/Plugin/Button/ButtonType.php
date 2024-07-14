<?php

namespace App\Form\Plugin\Button;

use App\Entity\Plugin\Button\PluginButton;
use App\Form\Plugin\shared\LinkType;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ButtonType extends LinkType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('type', TextType::class)
            ->add('label', TextType::class)
            ->add('position', ChoiceType::class,['choices' => ['left', 'right', 'center']])
        ;
        parent::buildForm($builder, $options);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginButton::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}