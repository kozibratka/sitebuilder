<?php


namespace App\Form\SiteBuilder\Plugin;


use App\Entity\SiteBuilder\Plugin\ImagePlugin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ImagePluginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('url')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ImagePlugin::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
