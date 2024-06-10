<?php

namespace App\Entity\Plugin\Button;

use App\Entity\Page\Page;
use App\Entity\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

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

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageId(): ?string
    {
        return $this->getPage()?->getId();
    }
}