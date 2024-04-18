<?php


namespace App\Form;


use App\Entity\Page;
use App\Form\SiteBuilder\PageBlockType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add(
                'pageBlocks',
                CollectionType::class,
                [
                    'entry_type' => PageBlockType::class,
                    'allow_add' => true,
                    'allow_delete' => true,
                    'by_reference' => false,
                    'entry_options' => ['sync_by_id' => $options['sync_by_id']],
                ]
            );
        if (!$options['pageBuilder']) {
            $builder
                ->add('name',null, ['empty_data' => ''])
                ->add('url', null, ['empty_data' => ''])
                ->add('description')
                ->add('homePage')
            ;
        }

    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(
            [
                'data_class' => Page::class,
                'allow_extra_fields' => true,
                'sync_by_id' => true,
                'pageBuilder' => false,
            ]
        );
    }
}
