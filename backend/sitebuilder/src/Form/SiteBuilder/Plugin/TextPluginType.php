<?php


namespace App\Form\SiteBuilder\Plugin;


use App\Entity\SiteBuilder\Plugin\TextPlugin;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TextPluginType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text')
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => TextPlugin::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
