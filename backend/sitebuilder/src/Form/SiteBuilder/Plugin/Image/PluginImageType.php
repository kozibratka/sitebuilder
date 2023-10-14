<?php


namespace App\Form\SiteBuilder\Plugin\Image;


use App\Entity\SiteBuilder\Plugin\Image\PluginImage;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginImageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('imagePath')
        ;
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
