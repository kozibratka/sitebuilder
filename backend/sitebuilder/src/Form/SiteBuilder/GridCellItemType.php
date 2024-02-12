<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\GridCellItem;
use App\Form\SiteBuilder\EventSubscriber\AddPluginFieldSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridCellItemType extends AbstractType
{
    private $addPluginFieldSubscriber;

    public function __construct(AddPluginFieldSubscriber $addPluginFieldSubscriber)
    {
        $this->addPluginFieldSubscriber = $addPluginFieldSubscriber;
    }
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addPluginFieldSubscriber->syncById = $options['is_preview'];
        $builder->addEventSubscriber($this->addPluginFieldSubscriber);
        $builder->add('id', null, ['required' => false, 'mapped' => false])
            ->add('itemOrder',IntegerType::class)
            ->add('uniqueId')
        ;
        if (!$options['is_sub_row']) {
            $builder->add('row',
                GridRowType::class,
                [
                    'is_preview' => $options['is_preview'],
                    'is_sub_row' => true,
                    'empty_data' => null,
                ]
            );
        }
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridCellItem::class,
            'is_preview' => false,
            'is_sub_row' => true,
        ]);
    }
}