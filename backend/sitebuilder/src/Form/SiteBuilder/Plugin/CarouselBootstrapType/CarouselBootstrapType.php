<?php


namespace App\Form\SiteBuilder\Plugin\CarouselBootstrapType;


use App\Entity\SiteBuilder\Plugin\CarouselBootstrapPlugin\CarouselBootstrapPlugin;
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
            ->add('intervalRotate', TextType::class)
            ->add('autostart', CheckboxType::class)
            ->add('images', CollectionType::class, [
                'entry_type' => CarouselBootstrapImageType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
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
