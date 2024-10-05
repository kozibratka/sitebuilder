<?php


namespace App\Form\Web;


use App\Entity\Web\Web;
use App\Form\SiteBuilder\PageBlockType;
use phpDocumentor\Reflection\Types\Collection;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class WebType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('name')
            ->add('domains', CollectionType::class, [
                'entry_type' => DomainType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
            ])
        ;
        if ($options['allow_is_template']) {
            $builder->add('isTemplate', CheckboxType::class, [
                'required' => false,
            ])
                ->add('file', FileType::class)

            ;
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => Web::class,
            'allow_is_template' => false,
        ]);
    }
}
