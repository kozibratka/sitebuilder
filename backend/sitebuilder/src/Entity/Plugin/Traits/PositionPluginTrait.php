<?php

namespace App\Entity\Plugin\Traits;

use Doctrine\ORM\Mapping as ORM;

trait PositionPluginTrait
{
    #[ORM\Column(type: 'string')]
    private string $position = '';

    public function getPosition(): string
    {
        return $this->position;
    }

    public function setPosition(string $position): void
    {
        $this->position = $position;
    }
}