<?php

namespace App\Form\SiteBuilder\Plugin\CarouselBootstrapType;

use App\Entity\SiteBuilder\Plugin\CarouselBootstrapPlugin\CarouselBootstrapPluginImage;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CarouselBootstrapImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('path', TextType::class)
            ->add('h1', TextType::class)
            ->add('h2', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CarouselBootstrapPluginImage::class,
            'allow_extra_fields' => true,
        ]);
    }
}
