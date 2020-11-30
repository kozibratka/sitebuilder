<?php

namespace App\Entity\PageBuilder\Plugin;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="text_plugin")
 */
class TextPlugin extends BasePlugin
{
    /**
     * @ORM\Column(type="text")
     */
    private string $text;

    public function __construct()
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
