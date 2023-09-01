<?php


namespace App\Form\SiteBuilder\Plugin\Image\ImageV1;


use App\Entity\SiteBuilder\Plugin\Image\ImageV1\ImageV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ImageV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('imagePath')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ImageV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
