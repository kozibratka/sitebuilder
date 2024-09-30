<?php

namespace App\Form\Plugin\Menu;
use App\Entity\Page\AbstractPage;
use App\Entity\Plugin\Menu\PluginMenuItem;
use App\Enum\Plugin\Menu\MenuItemTypeEnum;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MenuItemType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('pageId', EntityType::class, ['class' => AbstractPage::class, 'property_path' => 'page'])
            ->add('name', TextType::class)
            ->add('level', NumberType::class)
            ->add('uniqueId')
            ->add('type', EnumType::class, ['class' => MenuItemTypeEnum::class])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginMenuItem::class,
            'allow_extra_fields' => true,
        ]);
    }
}
