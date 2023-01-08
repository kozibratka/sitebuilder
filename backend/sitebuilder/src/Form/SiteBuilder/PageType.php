<?php


namespace App\Form\SiteBuilder;


use App\Entity\SiteBuilder\Page;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('name',null, ['empty_data' => ''])
            ->add('url', null, ['empty_data' => ''])
            ->add('description')
            ->add(
                'pageBlocks',
                CollectionType::class,
                [
                    'entry_type' => PageBlockType::class,
                    'allow_add' => true,
                    'allow_delete' => true,
                    'by_reference' => false,
                    'entry_options' => ['is_preview' => $options['is_preview']],
                ]
            );
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(
            [
                'data_class' => Page::class,
                'allow_extra_fields' => true,
                'is_preview' => false,
            ]
        );
    }
}
