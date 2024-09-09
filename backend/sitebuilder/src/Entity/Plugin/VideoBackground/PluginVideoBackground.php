<?php

namespace App\Entity\Plugin\VideoBackground;

use App\Entity\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_video_background')]
class PluginVideoBackground extends BasePlugin
{
    #[ORM\Column(type: 'text')]
    private string $videoPath;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $height = null;

    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $grayScale = null;

    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $opacity = null;

    public function setIdentifier()
    {
        $this->identifier = 'video_background_v1';
    }

    public function getVideoPath(): string
    {
        return $this->videoPath;
    }

    public function setVideoPath(string $videoPath): void
    {
        $this->videoPath = $videoPath;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(?int $height): void
    {
        $this->height = $height;
    }

    public function getGrayScale(): ?int
    {
        return $this->grayScale;
    }

    public function setGrayScale(?int $grayScale): void
    {
        $this->grayScale = $grayScale;
    }

    public function getOpacity(): ?int
    {
        return $this->opacity;
    }

    public function setOpacity(?int $opacity): void
    {
        $this->opacity = $opacity;
    }
}