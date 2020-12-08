<?php


namespace App\Form\PageBuilder;


use App\Entity\PageBuilder\Page;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name')
            ->add(
                'pageBlocks',
                CollectionType::class,
                [
                    'entry_type' => PageBlockType::class,
                    'allow_add' => true,
                    'allow_delete' => true
                ]
            );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(
            [
                'data_class' => Page::class,
            ]
        );
    }
}
