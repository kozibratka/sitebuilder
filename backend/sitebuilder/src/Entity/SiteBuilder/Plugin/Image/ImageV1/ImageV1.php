<?php

namespace App\Entity\SiteBuilder\Plugin\Image\ImageV1;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="image_v1")
 */
class ImageV1 extends BasePlugin
{
    /**
     * @ORM\Column(type="text")
     */
    private string $url;

    public function setIdentifier()
    {
        $this->identifier = 'image_v1';
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url)
    {
        $this->url = $url;
    }
}
