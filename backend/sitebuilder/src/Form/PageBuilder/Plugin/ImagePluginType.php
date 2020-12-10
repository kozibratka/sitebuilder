<?php


namespace App\Form\PageBuilder\Plugin;


use App\Entity\PageBuilder\Plugin\ImagePlugin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ImagePluginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('url')
            ->add('basePlugin', BasePluginType::class, ['data_class' => ImagePlugin::class])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ImagePlugin::class,
        ]);
    }
}
