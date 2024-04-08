<?php

namespace App\Entity\Plugin\Text;

use App\Entity\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
class PluginText extends BasePlugin
{
    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'text')]
    private ?string $text;

    public function __construct()
    {
        parent::__construct();
    }

    public function setIdentifier()
    {
        $this->identifier = 'text_v1';
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text)
    {
        $this->text = $text;
    }
}
