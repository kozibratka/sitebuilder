<?php

namespace App\Entity\SiteBuilder\Plugin\CarouselBootstrapPlugin;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table()
 */
class CarouselBootstrapPluginImage
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string")
     */
    private string $path = '';

    /**
     * @ORM\Column(type="string")
     */
    private string $h1 = '';

    /**
     * @ORM\Column(type="string")
     */
    private string $h2 = '';

    /**
     * @ORM\ManyToOne(targetEntity="CarouselBootstrapPlugin", inversedBy="images")
     */
    private $caruselBootstrapPlugin;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getPath(): string
    {
        return $this->path;
    }

    public function setPath(string $path)
    {
        $this->path = $path;
    }

    public function getH1(): string
    {
        return $this->h1;
    }

    public function setH1(string $h1)
    {
        $this->h1 = $h1;
    }

    public function getH2(): string
    {
        return $this->h2;
    }

    public function setH2(string $h2)
    {
        $this->h2 = $h2;
    }

    public function getCaruselBootstrapPlugin()
    {
        return $this->caruselBootstrapPlugin;
    }

    public function setCaruselBootstrapPlugin($caruselBootstrapPlugin)
    {
        $this->caruselBootstrapPlugin = $caruselBootstrapPlugin;
    }
}
