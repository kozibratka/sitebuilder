<?php

declare(strict_types=1);

namespace App\Form\Plugin\VideoBackground;

use App\Entity\Plugin\VideoBackground\PluginVideoBackground;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VideoBackgroundType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('videoPath')
            ->add('height', NumberType::class)
            ->add('grayScale', NumberType::class)
            ->add('opacity', NumberType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginVideoBackground::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
