<?php

namespace App\Entity\SiteBuilder\Plugin\Text\TextV1;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'text_v1')]
#[ORM\Entity]
class TextV1 extends BasePlugin
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
