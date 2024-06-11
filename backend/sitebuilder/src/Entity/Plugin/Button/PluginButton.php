<?php

namespace App\Entity\Plugin\Button;

use App\Entity\Page\Page;
use App\Entity\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_button')]
class PluginButton extends BasePlugin
{
    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $linkType = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $externalUrl = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $fileUrl = null;

    #[ORM\ManyToOne(targetEntity: Page::class)]
    private ?Page $page = null;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $label = '';

    #[ORM\Column(type: 'string')]
    private string $type = '';

    #[ORM\Column(type: 'string')]
    private string $position = '';

    public function getLinkType(): ?int
    {
        return $this->linkType;
    }

    public function setLinkType(?int $linkType): void
    {
        $this->linkType = $linkType;
    }

    public function getExternalUrl(): ?string
    {
        return $this->externalUrl;
    }

    public function setExternalUrl(?string $externalUrl): void
    {
        $this->externalUrl = $externalUrl;
    }

    public function getFileUrl(): ?string
    {
        return $this->fileUrl;
    }

    public function setFileUrl(?string $fileUrl): void
    {
        $this->fileUrl = $fileUrl;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): void
    {
        $this->page = $page;
    }

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

    public function getPosition(): string
    {
        return $this->position;
    }

    public function setPosition(string $position): void
    {
        $this->position = $position;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageId(): ?string
    {
        return $this->getPage()?->getId();
    }
}