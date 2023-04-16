<?php

namespace App\Entity\SiteBuilder\Plugin\Carousel\CarouselV1;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="carousel_v1")
 */
class CarouselV1 extends BasePlugin
{
    /**
     * @ORM\Column(type="integer")
     */
    private ?int $intervalRotate;

    /**
     * @ORM\Column(type="boolean")
     */
    private ?bool $autostart = true;

    /**
     * @ORM\OneToMany(targetEntity="Image", cascade={"persist"}, orphanRemoval=true, mappedBy="carousel")
     */
    private $images;

    public function __construct()
    {
        parent::__construct();
        $this->images = new ArrayCollection();
    }

    public function setIdentifier()
    {
        $this->identifier = 'carousel_v1';
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text)
    {
        $this->text = $text;
    }

    public function getIntervalRotate(): ?int
    {
        return $this->intervalRotate;
    }

    public function setIntervalRotate(?int $intervalRotate)
    {
        $this->intervalRotate = $intervalRotate;
    }

    public function getAutostart(): ?bool
    {
        return $this->autostart;
    }

    public function setAutostart(?bool $autostart)
    {
        $this->autostart = $autostart;
    }

    public function getImages(): ?Collection
    {
        return $this->images;
    }

    public function setImages($images)
    {
        $this->images = $images;
    }

    public function addImage(CarouselImageV1 $image)
    {
        $this->images->add($image);
        $image->setCarousel($this);
    }

    public function removeImage($image)
    {
        $this->images->removeElement($image);
    }
}
