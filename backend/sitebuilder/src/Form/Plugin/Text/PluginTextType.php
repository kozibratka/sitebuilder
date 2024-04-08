<?php


namespace App\Form\Plugin\Text;


use App\Entity\Plugin\Text\PluginText;
use App\Form\Plugin\BasePluginType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PluginTextType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add('text')
            ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => PluginText::class,
        ]);
    }

    public function getParent()
    {
        return BasePluginType::class;
    }
}
