<?php

namespace App\Entity\SiteBuilder\Plugin;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="image_plugin")
 */
class ImagePlugin extends BasePlugin
{
    /**
     * @ORM\Column(type="text")
     */
    private string $url;

    public function setIdentifier()
    {
        $this->identifier = 'image_plugin';
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
