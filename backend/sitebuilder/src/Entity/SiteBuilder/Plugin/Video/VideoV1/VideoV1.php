<?php

namespace App\Entity\SiteBuilder\Plugin\Video\VideoV1;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Table(name: 'video_v1')]
#[ORM\Entity]
class VideoV1 extends BasePlugin
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
