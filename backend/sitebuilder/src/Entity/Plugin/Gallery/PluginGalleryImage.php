<?php

namespace App\Entity\Plugin\Gallery;

use App\Entity\Plugin\Traits\ImageTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_gallery_image')]
class PluginGalleryImage
{
    use ImageTrait;

    #[ORM\Id()]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: PluginGallery::class, inversedBy: 'images')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private $gallery;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id): void
    {
        $this->id = $id;
    }

    public function getGallery()
    {
        return $this->gallery;
    }

    public function setGallery($gallery): void
    {
        $this->gallery = $gallery;
    }
}