<?php

namespace App\Form\SiteBuilder;

use App\Entity\SiteBuilder\PageBlockAssignment;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageBlockAssignmentType extends AbstractType
{

    public function __construct(
    )
    {
    }

    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('uniqueId')
            ->add('orderItem')
            ->add('pageBlock', PageBlockType::class, [
                'allow_extra_fields' => $options['allow_extra_fields'],
                'sync_by_id' => $options['sync_by_id'],
                'web' => $options['web'],
            ])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PageBlockAssignment::class,
            'allow_extra_fields' => true,
            'sync_by_id' => true,
            'web' => null,
        ]);
    }
}