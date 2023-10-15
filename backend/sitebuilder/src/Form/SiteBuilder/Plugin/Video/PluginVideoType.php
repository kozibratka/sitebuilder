<?php


namespace App\Form\SiteBuilder\Plugin\Video;


use App\Entity\SiteBuilder\Plugin\Video\PluginVideo;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginVideoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('videoPath')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginVideo::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
