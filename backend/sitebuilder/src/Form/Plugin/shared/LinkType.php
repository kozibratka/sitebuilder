<?php

namespace App\Form\Plugin\shared;

use App\Entity\Page\AbstractPage;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;

class LinkType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('fileUrl')
            ->add('linkType', IntegerType::class)
            ->add('pageId', EntityType::class, ['class' => AbstractPage::class, 'property_path' => 'page'])
            ->add('externalUrl', TextType::class)
            ->add('targetBlank', CheckboxType::class)
        ;
    }
}