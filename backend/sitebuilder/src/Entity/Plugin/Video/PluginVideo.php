<?php

namespace App\Entity\Plugin\Video;

use App\Entity\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginVideo extends BasePlugin
{
    #[ORM\Column(type: 'text')]
    private string $videoPath;

    public function setIdentifier()
    {
        $this->identifier = 'video_v1';
    }

    public function getVideoPath(): string
    {
        return $this->videoPath;
    }

    public function setVideoPath(string $videoPath)
    {
        $this->videoPath = $videoPath;
    }
}
