<?php

declare(strict_types=1);

namespace App\Form\Plugin\Delimiter;

use App\Entity\Plugin\Delimiter\PluginDelimiter;
use App\Entity\Util\Enum\Plugin\DelimiterTypeEnum;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\EnumType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class DelimiterType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('type', EnumType::class, ['class' => DelimiterTypeEnum::class])
            ->add('color', TextType::class)
            ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PluginDelimiter::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
