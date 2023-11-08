<?php

namespace App\Entity\SiteBuilder\Plugin\Image;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginImage extends BasePlugin
{
    #[ORM\Column(type: 'text')]
    private string $imagePath;

    #[ORM\Column(type: 'integer')]
    private int $circle = 0;

    #[ORM\Column(type: 'integer')]
    private int $blur = 0;

    #[ORM\Column(type: 'integer')]
    private int $grayscale = 0;

    #[ORM\Column(type: 'integer')]
    private int $sepia = 0;

    public function setIdentifier()
    {
        $this->identifier = 'image_v1';
    }

    public function getImagePath(): string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath)
    {
        $this->imagePath = $imagePath;
    }

    public function getCircle(): int
    {
        return $this->circle;
    }

    public function setCircle(int $circle): void
    {
        $this->circle = $circle;
    }

    public function getBlur(): int
    {
        return $this->blur;
    }

    public function setBlur(int $blur): void
    {
        $this->blur = $blur;
    }

    public function getGrayscale(): int
    {
        return $this->grayscale;
    }

    public function setGrayscale(int $grayscale): void
    {
        $this->grayscale = $grayscale;
    }

    public function getSepia(): int
    {
        return $this->sepia;
    }

    public function setSepia(int $sepia): void
    {
        $this->sepia = $sepia;
    }
}
