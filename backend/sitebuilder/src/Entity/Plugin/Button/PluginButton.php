<?php

namespace App\Entity\Plugin\Button;

use App\Entity\Page\Page;
use App\Entity\Plugin\BasePlugin;
use App\Entity\Plugin\Traits\LinkPluginTrait;
use App\Entity\Plugin\Traits\PositionPluginTrait;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_button')]
class PluginButton extends BasePlugin
{
    use LinkPluginTrait;
    use PositionPluginTrait;
    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $label = '';

    #[ORM\Column(type: 'string')]
    private string $type = '';


    public function setIdentifier()
    {
        $this->identifier = 'button_v1';
    }

    public function getLabel(): string
    {
        return $this->label;
    }

    public function setLabel(string $label): void
    {
        $this->label = $label;
    }

    public function getType(): string
    {
        return $this->type;
    }

    public function setType(string $type): void
    {
        $this->type = $type;
    }
}