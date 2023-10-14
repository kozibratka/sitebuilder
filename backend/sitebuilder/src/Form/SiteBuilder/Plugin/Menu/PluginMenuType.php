<?php

namespace App\Form\SiteBuilder\Plugin\Menu;

use App\Entity\SiteBuilder\Plugin\Menu\PluginMenu;
use App\Form\SiteBuilder\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginMenuType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('logoName')
            ->add('logoImage')
            ->add('items', CollectionType::class, [
                'entry_type' => MenuItemType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginMenu::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
