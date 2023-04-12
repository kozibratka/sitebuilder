<?php

namespace App\Form\SiteBuilder\Plugin\MenuSimpleType;

use App\Entity\SiteBuilder\Plugin\MenuSimple\MenuSimpleItem;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuSimpleType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('menuSimpleItems', CollectionType::class, [
                'entry_type' => MenuSimpleItemType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MenuSimpleItem::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
