<?php

namespace App\Form\Plugin\Button;

use App\Entity\Page\AbstractPage;
use App\Entity\Plugin\Button\PluginButton;
use App\Form\Plugin\BasePluginType;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ButtonType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('externalUrl')
            ->add('fileUrl')
            ->add('linkType', IntegerType::class)
            ->add('pageId', EntityType::class, ['class' => AbstractPage::class, 'property_path' => 'page'])
            ->add('type', TextType::class)
            ->add('label', TextType::class)
            ->add('position', ChoiceType::class,['choices' => ['left', 'right', 'center']])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginButton::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}