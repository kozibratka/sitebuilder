<?php


namespace App\Form\Plugin\Image;


use App\Entity\Plugin\Image\PluginImage;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('imagePath')
            ->add('circle')
            ->add('blur')
            ->add('grayscale')
            ->add('sepia');
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginImage::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
