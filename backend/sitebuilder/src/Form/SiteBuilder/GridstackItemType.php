<?php


namespace App\Form\SiteBuilder;


use App\Entity\SiteBuilder\GridstackItem;
use App\Form\SiteBuilder\EventSubscriber\AddPluginFieldSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridstackItemType extends AbstractType
{
    private $addPluginFieldSubscriber;

    public function __construct(AddPluginFieldSubscriber $addPluginFieldSubscriber)
    {
        $this->addPluginFieldSubscriber = $addPluginFieldSubscriber;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('id', null, ['required' => false])
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
            'data_class' => GridstackItem::class,
        ]);
    }
}
