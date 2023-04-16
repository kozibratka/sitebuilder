<?php


namespace App\Form\SiteBuilder\Plugin\Text\TextV1;


use App\Entity\SiteBuilder\Plugin\Text\TextV1\TextV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class TextV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text')
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => TextV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
