<?php

namespace App\Form\Plugin\Gallery;

use App\Entity\Plugin\Gallery\GalleryImage;
use App\Form\Plugin\shared\ImageType;
use Symfony\Component\OptionsResolver\OptionsResolver;

class GalleryImageType extends ImageType
{
    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => GalleryImage::class,
            'allow_extra_fields' => true,
        ]);
    }
}
