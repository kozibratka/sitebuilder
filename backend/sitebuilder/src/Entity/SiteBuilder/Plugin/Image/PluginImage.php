<?php

namespace App\Entity\SiteBuilder\Plugin\Image;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginImage extends BasePlugin
{
    #[ORM\Column(type: 'text')]
    private string $imagePath;

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
}