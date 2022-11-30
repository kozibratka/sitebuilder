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
        $this->addPluginFieldSubscriber->isPreview = $options['is_preview'];
        $builder
            ->add('id', null, ['required' => false])
            ->add('width')
            ->add('height')
            ->add('x')
            ->add('y')
            ->addEventSubscriber($this->addPluginFieldSubscriber)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PaletteGridItem::class,
            'is_preview' => false,
        ]);
    }
}
