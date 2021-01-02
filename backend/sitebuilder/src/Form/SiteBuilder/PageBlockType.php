<?php


namespace App\Form\SiteBuilder;


use App\Entity\SiteBuilder\PageBlock;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageBlockType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add("height")
            ->add('paletteGridItems', CollectionType::class, [
                'entry_type' => PaletteGridItemType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false
            ])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PageBlock::class,
            'allow_extra_fields' => true
        ]);
    }
}
