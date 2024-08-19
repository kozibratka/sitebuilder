<?php

namespace App\Entity\Plugin\Gallery;

use App\Constant\Limit;
use App\Entity\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Validator as AppValidator;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_gallery')]
class PluginGallery extends BasePlugin
{
    #[ORM\Column(type: 'integer')]
    private int $thumbnailHeight = 0;

    #[AppValidator\CountTariff(
        type: 'pluginItems',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\OneToMany(targetEntity: GalleryImage::class, cascade: ['persist'], orphanRemoval: true, mappedBy: 'gallery')]
    private $images;

    public function __construct()
    {
        parent::__construct();
        $this->images = new ArrayCollection();
    }


    public function setIdentifier()
    {
         $this->identifier = 'gallery_v1';
    }

    public function getThumbnailHeight(): int
    {
        return $this->thumbnailHeight;
    }

    public function setThumbnailHeight(int $thumbnailHeight): void
    {
        $this->thumbnailHeight = $thumbnailHeight;
    }

    public function getImages()
    {
        return $this->images;
    }

    public function setImages($images): void
    {
        $this->images = $images;
    }

    public function addImage(GalleryImage $image)
    {
        $this->images->add($image);
        $image->setGallery($this);
    }

    public function removeImage($image)
    {
        $this->images->removeElement($image);
    }
}