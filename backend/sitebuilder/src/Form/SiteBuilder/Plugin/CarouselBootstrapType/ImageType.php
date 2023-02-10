<?php

namespace App\Form\SiteBuilder\Plugin\CarouselBootstrapType;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class ImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('path', TextType::class)
            ->add('h1', TextType::class)
            ->add('h2', TextType::class)
        ;
    }
}
