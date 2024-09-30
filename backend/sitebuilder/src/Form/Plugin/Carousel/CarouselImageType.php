<?php

namespace App\Form\Plugin\Carousel;

use App\Entity\Plugin\Carousel\PluginCarouselImage;
use App\Form\Plugin\shared\ImageType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CarouselImageType extends ImageType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('h2', TextType::class)
        ;
        parent::buildForm($builder, $options);
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginCarouselImage::class,
            'allow_extra_fields' => true,
        ]);
    }
}
