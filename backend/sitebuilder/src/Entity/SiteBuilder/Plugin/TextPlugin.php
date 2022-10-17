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
    private ?string $text;

    public function __construct()
    {
        parent::__construct();
        $this->text = $this->getInitText();
    }

    public function setIdentifier()
    {
        $this->identifier = 'text_plugin';
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text)
    {
        $this->text = $text;
    }

    private function getInitText(): string
    {
        return "Lorem Ipsum is simply dummy text of the 
        printing and typesetting industry. Lorem Ipsum has been the 
        industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of 
        type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the 
        leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of 
        Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker 
        including versions of Lorem Ipsum.";
    }
}
