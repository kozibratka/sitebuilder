<?php

namespace App\Entity\SiteBuilder\Plugin;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="text_plugin")
 */
class TextPlugin extends BasePlugin
{
    /**
     * @ORM\Column(type="text")
     * @Assert\NotBlank()
     */
    private string $text;

    public function setIdentifier()
    {
        $this->identifier = 'text_plugin';
    }

    public function getText(): string
    {
        return $this->text;
    }

    public function setText(string $text)
    {
        $this->text = $text;
    }
}
