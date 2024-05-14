<?php

namespace App\Form\Plugin\Form;

use App\Entity\Plugin\Form\PluginForm;
use App\Form\Plugin\BasePluginType;
use App\Form\Type\UnstructuredType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginFormType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('email')
            ->add('form', UnstructuredType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginForm::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
