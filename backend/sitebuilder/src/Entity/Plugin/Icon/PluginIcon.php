<?php

namespace App\Entity\Plugin\Icon;

use App\Entity\Plugin\BasePlugin;
use App\Entity\Plugin\Traits\LinkPluginTrait;
use App\Entity\Plugin\Traits\PositionPluginTrait;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_icon')]
class PluginIcon extends BasePlugin
{
    use LinkPluginTrait;
    use PositionPluginTrait;

    #[ORM\Column(type: 'string')]
    private string $icon = '';

    #[ORM\Column(type: 'string')]
    private string $size = '';

    public function setIdentifier()
    {
        $this->identifier = 'icon_v1';
    }

    public function getIcon(): string
    {
        return $this->icon;
    }

    public function setIcon(string $icon): void
    {
        $this->icon = $icon;
    }

    public function getSize(): string
    {
        return $this->size;
    }

    public function setSize(string $size): void
    {
        $this->size = $size;
    }
}