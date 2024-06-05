<?php


namespace App\Form\SiteBuilder;


use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Entity\Web\Web;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Event\PreSubmitEvent;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PageBlockType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('uniqueId')
            ->add('isFromTemplateBlock', CheckboxType::class)
            ->add('backgroundColor')
            ->add('backgroundImage')
            ->add('backgroundVideo')
            ->add('height', NumberType::class)
            ->add('grayScale', NumberType::class)
            ->add('opacity', NumberType::class)
            ->add('paddingTop', NumberType::class)
            ->add('paddingBottom', NumberType::class)
        ;
        if ($options['web']) {
            $builder->add('web', EntityType::class, ['class' => Web::class])
                ->add('category', EntityType::class, ['class' => PageBlockTemplateCategory::class])
            ;
        }

        $builder->addEventListener(FormEvents::PRE_SUBMIT, function(PreSubmitEvent $event) use($options) {
            $data = $event->getData();
            $form = $event->getForm();
            $syncById = $options['sync_by_id'];
            if (isset($data['isFromTemplateBlock']) && $data['isFromTemplateBlock']) {
                $syncById = false;
            }
            $form->add('rows', CollectionType::class, [
                'entry_type' => GridRowType::class,
                'allow_add' => true,
                'allow_delete' => true,
                'by_reference' => false,
                'entry_options' => ['sync_by_id' => $syncById],
            ]);
        });
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => PageBlock::class,
            'allow_extra_fields' => true,
            'sync_by_id' => true,
            'web' => null,
        ]);
    }
}
