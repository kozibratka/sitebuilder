<?php

namespace App\Entity\Plugin\Traits;

use App\Entity\Page\Page;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

Trait LinkPluginTrait
{
    #[ORM\Column(type: 'boolean')]
    private bool $targetBlank = true;

    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $linkType = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $externalUrl = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $fileUrl = null;

    #[ORM\ManyToOne(targetEntity: Page::class)]
    private ?Page $page = null;

    public function isTargetBlank(): bool
    {
        return $this->targetBlank;
    }

    public function setTargetBlank(bool $targetBlank): void
    {
        $this->targetBlank = $targetBlank;
    }

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

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageId(): ?string
    {
        return $this->getPage()?->getId();
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageUrl()
    {
        return $this->getPage()?->getUrl();
    }
}