<?php


namespace App\Form\PageBuilder;


use App\Entity\PageBuilder\GridstackItem;
use App\Form\PageBuilder\EventSubscriber\AddGridstackItemFromDatabaseSubscriber;
use App\Form\PageBuilder\EventSubscriber\AddPluginFieldSubscriber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GridstackItemType extends AbstractType
{
    /** @required  */
    public AddGridstackItemFromDatabaseSubscriber $addGridstackItemFromDatabaseSubscriber;
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
            //->addEventSubscriber($this->addGridstackItemFromDatabaseSubscriber)
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GridstackItem::class,
        ]);
    }
}
