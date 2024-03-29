<?php


namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\PaletteGridItem;
use App\Form\SiteBuilder\EventSubscriber\AddPluginFieldSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PaletteGridItemType extends AbstractType
{
    private $addPluginFieldSubscriber;

    public function __construct(AddPluginFieldSubscriber $addPluginFieldSubscriber)
    {
        $this->addPluginFieldSubscriber = $addPluginFieldSubscriber;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $this->addPluginFieldSubscriber->syncById = $options['sync_by_id'];
        $builder
            ->add('id', null, ['required' => false])
            ->add('w')
            ->add('h')
            ->add('x')
            ->add('y')
            ->add('diffGridAndContentBottomHeightPx')
            ->add('uniqueId')
            ->addEventSubscriber($this->addPluginFieldSubscriber)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PaletteGridItem::class,
            'sync_by_id' => true,
        ]);
    }
}
