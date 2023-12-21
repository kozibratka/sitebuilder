<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\GridRow;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridRowType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('cells',
            CollectionType::class,
            [
                'entry_type' => GridCellType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'entry_options' => ['is_preview' => $options['is_preview']],
            ]
        );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridRow::class,
            'is_preview' => false,
        ]);
    }
}