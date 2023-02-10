<?php


namespace App\Form\SiteBuilder\Plugin\CarouselBootstrapType;


use App\Entity\SiteBuilder\Plugin\CarouselBootstrapPlugin;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CarouselBootstrapType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('interval', TextType::class)
            ->add('autostart', CheckboxType::class)
            ->add('images', CollectionType::class, ['entry_type' => ImageType::class])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CarouselBootstrapPlugin::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
