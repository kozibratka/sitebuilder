<?php

declare(strict_types=1);

namespace App\Form\Website;

use App\Entity\Website\WebsiteContact;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ContactType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('subject', null, ['empty_data' => ''])
            ->add('message', null, ['empty_data' => ''])
            ->add('name', null, ['empty_data' => ''])
            ->add('email', null, ['empty_data' => ''])
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => WebsiteContact::class,
        ]);
    }
}
