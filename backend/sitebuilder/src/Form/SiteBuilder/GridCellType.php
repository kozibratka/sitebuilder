<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\GridCell;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridCellType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', null, ['required' => false, 'mapped' => false])
            ->add('items',
            CollectionType::class,
            [
                'entry_type' => GridCellItemType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'entry_options' => ['is_preview' => $options['is_preview'], 'is_sub_row' => $options['is_sub_row']],
            ]
        )
            ->add('width', IntegerType::class)
            ->add('uniqueId')
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridCell::class,
            'is_preview' => false,
            'is_sub_row' => false,
        ]);
    }
}