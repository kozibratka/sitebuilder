<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\GridCellItem;
use App\Form\SiteBuilder\EventSubscriber\AddPluginFieldSubscriber;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
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
        $this->addPluginFieldSubscriber->isPreview = $options['is_preview'];
        $builder->add('row',
            EntityType::class,
            [
                'entry_type' => GridRowType::class,
            ]
        )->addEventSubscriber($this->addPluginFieldSubscriber)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridCellItem::class,
            'is_preview' => false,
        ]);
    }
}