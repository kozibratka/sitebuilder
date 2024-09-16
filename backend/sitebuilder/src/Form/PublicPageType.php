<?php

namespace App\Form;

use App\Entity\Page\PublicPage;
use Symfony\Component\OptionsResolver\OptionsResolver;

class PublicPageType extends PageType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults(
            [
                'data_class' => PublicPage::class,
                'allow_extra_fields' => true,
                'sync_by_id' => true,
                'pageBuilder' => false,
            ]
        );
    }
}