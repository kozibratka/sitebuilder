<?php

namespace App\Form\Plugin\Icon;

use App\Entity\Plugin\Icon\PluginIcon;
use App\Form\Plugin\AbstractClass\AbstractLinkType;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class IconType extends AbstractLinkType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('icon', TextType::class)
            ->add('size', TextType::class)
            ->add('position', ChoiceType::class,['choices' => ['left', 'right', 'center']])

        ;
        parent::buildForm($builder, $options);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginIcon::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}