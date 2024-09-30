<?php

namespace App\Entity\Plugin\Carousel;

use App\Entity\Plugin\Traits\ImageTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginCarouselImage
{
    use ImageTrait;
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'string')]
    private string $h2 = '';

    #[ORM\ManyToOne(targetEntity: 'PluginCarousel', inversedBy: 'images')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private $carousel;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getH2(): string
    {
        return $this->h2;
    }

    public function setH2(string $h2)
    {
        $this->h2 = $h2;
    }

    public function getCarousel()
    {
        return $this->carousel;
    }

    public function setCarousel($carousel)
    {
        $this->carousel = $carousel;
    }

    public function __clone(): void
    {
        $this->id = null;
    }
}
