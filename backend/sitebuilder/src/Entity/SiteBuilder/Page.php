<?php

namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[UniqueEntity(
    fields: ['name', 'web', 'parentForPublic'],
    errorPath: 'name',
)]
#[UniqueEntity(
    fields: ['url', 'web', 'parentForPublic'],
    errorPath: 'url',
)]
#[ORM\Table(name: 'page')]
#[ORM\Entity(repositoryClass: 'App\Repository\PageRepository')]
class Page
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $name;

    /**
     * @Assert\Valid()
     */
    #[ORM\OneToMany(targetEntity: 'App\Entity\SiteBuilder\PageBlock', mappedBy: 'page', cascade: ['persist'], orphanRemoval: true)]
    private Collection $pageBlocks;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: 'App\Entity\SiteBuilder\Web', inversedBy: 'pages')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private Web $web;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $url;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = '';

    #[ORM\OneToOne(targetEntity: 'App\Entity\SiteBuilder\Page')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Page $parentForPublic = null;

    private array $globalPlugins = [];

    public function __construct()
    {
        $this->pageBlocks = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getPageBlocks(): Collection
    {
        return $this->pageBlocks;
    }

    public function addPageBlock(PageBlock $pageBlock) {
        $pageBlock->setPage($this);
        $this->pageBlocks->add($pageBlock);
    }

    public function removePageBlock(PageBlock $pageBlock) {
        $this->pageBlocks->removeElement($pageBlock);
    }

    public function getWeb(): Web
    {
        return $this->web;
    }

    public function setWeb(Web $web)
    {
        $this->web = $web;
    }

    public function getGlobalPlugins(): array
    {
        return $this->globalPlugins;
    }

    public function setGlobalPlugins(array $globalPlugins)
    {
        $this->globalPlugins = $globalPlugins;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url)
    {
        $this->url = $url;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function getParentForPublic(): ?Page
    {
        return $this->parentForPublic;
    }

    public function setParentForPublic(?Page $parentForPublic)
    {
        $this->parentForPublic = $parentForPublic;
    }

    public function getGridCellItems(): array
    {
        $gridCellItems = $this->pageBlocks->map(fn(PageBlock $pageBlock) => $pageBlock->getGridCellItems())->toArray();
        return array_merge(...$gridCellItems);
    }

    public function refreshGridCellItemOrder()
    {
        /** @var PageBlock $block */
        foreach ($this->pageBlocks as $block) {
            $block->refreshGridCellItemOrder();
        }
    }

    public function getUser() {
        return $this->web?->getUser();
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getWebBlocks(): array {
        return $this->getWeb()->getAllWebBlocks();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->pageBlocks = new ArrayCollection($this->pageBlocks->map(function(PageBlock $pageBlock) {
            $clone = clone $pageBlock;
            $clone->setPage($this);
            return $clone;
        })->toArray());
    }
}
