<?php


namespace App\Form\SiteBuilder;


use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Entity\SiteBuilder\Web;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageBlockType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
//            ->add('paletteGridItems', CollectionType::class, [
//                'entry_type' => PaletteGridItemType::class,
//                'allow_add' => true,
//                'allow_delete' => true,
//                'by_reference' => false,
//                'entry_options' => ['is_preview' => $options['is_preview']]
//            ])
            ->add('rows', CollectionType::class, [
                'entry_type' => GridRowType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'entry_options' => ['is_preview' => $options['is_preview']],
            ])
            ->add('uniqueId')
        ;
        if ($options['web']) {
            $builder->add('web', EntityType::class, ['class' => Web::class])
                ->add('category', EntityType::class, ['class' => PageBlockTemplateCategory::class])
            ;
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PageBlock::class,
            'allow_extra_fields' => true,
            'is_preview' => false,
            'web' => null,
        ]);
    }
}
