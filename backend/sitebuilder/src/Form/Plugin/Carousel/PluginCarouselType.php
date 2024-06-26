<?php


namespace App\Form\Plugin\Carousel;


use App\Entity\Plugin\Carousel\PluginCarousel;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginCarouselType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('intervalRotate', TextType::class)
            ->add('autostart', CheckboxType::class)
            ->add('images', CollectionType::class, [
                'entry_type' => CarouselImageType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginCarousel::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
