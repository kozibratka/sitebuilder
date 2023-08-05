<?php


namespace App\Form\SiteBuilder\Plugin\Carousel\CarouselV1;


use App\Entity\SiteBuilder\Plugin\Carousel\CarouselV1\CarouselV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class CarouselV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('intervalRotate', TextType::class)
            ->add('autostart', CheckboxType::class)
            ->add('images', CollectionType::class, [
                'entry_type' => CarouselV1ImageType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => CarouselV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
