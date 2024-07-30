<?php

namespace App\Entity\Plugin\Map;

use App\Entity\Plugin\BasePlugin;
use App\Entity\Plugin\Traits\LinkPluginTrait;
use App\Entity\Plugin\Traits\PositionPluginTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_map')]
class PluginMap extends BasePlugin
{
    #[ORM\Column(type: 'float')]
    private float $lat = 0;

    #[ORM\Column(type: 'float')]
    private float $lng = 0;

    #[ORM\Column(type: 'integer')]
    private int $height = 300;

    #[ORM\Column(type: 'string')]
    private string $title = '';

    public function setIdentifier()
    {
        $this->identifier = 'map_v1';
    }

    public function getLat(): float
    {
        return $this->lat;
    }

    public function setLat(float $lat): void
    {
        $this->lat = $lat;
    }

    public function getLng(): float
    {
        return $this->lng;
    }

    public function setLng(float $lng): void
    {
        $this->lng = $lng;
    }

    public function getHeight(): int
    {
        return $this->height;
    }

    public function setHeight(int $height): void
    {
        $this->height = $height;
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function setTitle(string $title): void
    {
        $this->title = $title;
    }
}