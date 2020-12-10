<?php

namespace App\Entity\PageBuilder\Plugin;

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

    public function __construct()
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
