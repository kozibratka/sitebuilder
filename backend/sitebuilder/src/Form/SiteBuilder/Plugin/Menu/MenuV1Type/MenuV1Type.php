<?php

namespace App\Form\SiteBuilder\Plugin\Menu\MenuV1Type;

use App\Entity\SiteBuilder\Plugin\Menu\MenuV1\MenuV1;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuV1Type extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('menuSimpleItems', CollectionType::class, [
                'entry_type' => MenuV1ItemType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => MenuV1::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
