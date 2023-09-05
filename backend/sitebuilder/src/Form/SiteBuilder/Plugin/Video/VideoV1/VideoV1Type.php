<?php


namespace App\Form\SiteBuilder\Plugin\Video\VideoV1;


use App\Entity\SiteBuilder\Plugin\Video\VideoV1\VideoV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class VideoV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('videoPath')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => VideoV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
