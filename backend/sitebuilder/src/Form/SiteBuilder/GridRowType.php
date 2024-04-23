<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\GridRow;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridRowType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('id', null, ['required' => false, 'mapped' => false])
            ->add('cells',
            CollectionType::class,
            [
                'entry_type' => GridCellType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'entry_options' => [
                    'sync_by_id' => $options['sync_by_id'],
                    'is_sub_row' => $options['is_sub_row']
                ],
            ]
        )
            ->add('uniqueId', TextType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridRow::class,
            'sync_by_id' => true,
            'is_sub_row' => false,
        ]);
    }
}