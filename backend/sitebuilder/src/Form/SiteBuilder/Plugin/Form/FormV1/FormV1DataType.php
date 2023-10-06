<?php


namespace App\Form\SiteBuilder\Plugin\Form\FormV1;


use App\Entity\SiteBuilder\Plugin\Form\FormV1\FormV1Data;
use App\Form\Type\JsonType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class FormV1DataType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('data', JsonType::class)
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => FormV1Data::class,
        ]);
    }
}
