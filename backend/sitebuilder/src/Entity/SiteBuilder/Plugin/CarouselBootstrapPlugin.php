<?php

namespace App\Entity\SiteBuilder\Plugin;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="carousel_bootstrap_plugin")
 */
class CarouselBootstrapPlugin extends BasePlugin
{
    /**
     * @ORM\Column(type="integer")
     */
    private ?int $interval;

    /**
     * @ORM\Column(type="boolean")
     */
    private ?bool $autostart = true;

    /**
     * @ORM\Column(type="array")
     */
    private ?array $images = [];

    public function __construct()
    {
        parent::__construct();
    }

    public function setIdentifier()
    {
        $this->identifier = 'carousel_bootstrap_plugin';
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text)
    {
        $this->text = $text;
    }

    public function getInterval(): ?int
    {
        return $this->interval;
    }

    public function setInterval(?int $interval)
    {
        $this->interval = $interval;
    }

    public function getAutostart(): ?bool
    {
        return $this->autostart;
    }

    public function setAutostart(?bool $autostart)
    {
        $this->autostart = $autostart;
    }

    public function getImages(): ?array
    {
        return $this->images;
    }

    public function setImages(?array $images)
    {
        $this->images = $images;
    }
}
