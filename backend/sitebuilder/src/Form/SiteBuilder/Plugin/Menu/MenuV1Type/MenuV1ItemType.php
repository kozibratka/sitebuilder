<?php

namespace App\Form\SiteBuilder\Plugin\Menu\MenuV1Type;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\Plugin\Menu\MenuV1\MenuV1Item;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuV1ItemType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('page', EntityType::class, ['class' => Page::class])
            ->add('name', TextType::class)
            ->add('level', NumberType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MenuV1Item::class,
            'allow_extra_fields' => true,
        ]);
    }
}
