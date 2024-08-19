<?php

namespace App\Entity\Plugin\Carousel;

use App\Constant\Limit;
use App\Entity\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Validator as AppValidator;

#[ORM\Entity]
class PluginCarousel extends BasePlugin
{
    #[ORM\Column(type: 'integer')]
    private ?int $intervalRotate;

    #[ORM\Column(type: 'boolean')]
    private ?bool $autostart = true;

    #[AppValidator\CountTariff(
        type: 'pluginItems',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\OneToMany(targetEntity: 'CarouselImage', cascade: ['persist'], orphanRemoval: true, mappedBy: 'carousel')]
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

    public function addImage(CarouselImage $image)
    {
        $this->images->add($image);
        $image->setCarousel($this);
    }

    public function removeImage($image)
    {
        $this->images->removeElement($image);
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->images = new ArrayCollection($this->images->map(function(CarouselImage $item) {
            $clone = clone $item;
            $clone->setCarousel($this);
            return $clone;
        })->toArray());
    }
}
