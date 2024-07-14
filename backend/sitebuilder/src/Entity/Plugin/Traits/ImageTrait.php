<?php

namespace App\Entity\Plugin\Traits;

use Doctrine\ORM\Mapping as ORM;

trait ImageTrait
{
    #[ORM\Column(type: 'string')]
    private string $path = '';

    #[ORM\Column(type: 'string')]
    private string $h1 = '';

    public function getPath(): string
    {
        return $this->path;
    }

    public function setPath(string $path): void
    {
        $this->path = $path;
    }

    public function getH1(): string
    {
        return $this->h1;
    }

    public function setH1(string $h1): void
    {
        $this->h1 = $h1;
    }
}