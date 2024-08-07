<?php

namespace App\Entity\Page;

use App\Constant\Limit;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\Web\Web;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[UniqueEntity(
    fields: ['name', 'web'],
    errorPath: 'name',
)]
#[UniqueEntity(
    fields: ['url', 'web'],
    errorPath: 'url',
)]
#[ORM\Table(name: 'page')]
#[ORM\Index(columns: ['url'], name: 'url')]
#[ORM\Entity()]
#[ORM\InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn(name: 'type', type: 'string')]
#[ORM\DiscriminatorMap(['public' => PublicPage::class, 'private' => Page::class])]

abstract class AbstractPage
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
    #[Assert\Count(
        max: Limit::PAGE_BLOCKS,
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\ManyToMany(targetEntity: 'App\Entity\SiteBuilder\PageBlock', inversedBy: 'pages', cascade: ['persist', 'remove'])]
    protected Collection $pageBlocks;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'pages')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private Web $web;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $url = '';

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = '';

    #[ORM\Column(type: 'boolean')]
    private bool $homePage = false;

    private array $globalPlugins = [];

    private array $pageBlockToDelete = [];

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
        $this->pageBlocks->add($pageBlock);
        $pageBlock->addPage($this);
    }

    public function removePageBlock(PageBlock $pageBlock) {
        $this->pageBlocks->removeElement($pageBlock);
        $pageBlock->removePage($this);
        $this->pageBlockToDelete[] = $pageBlock;
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function isHomePage(): bool
    {
        return $this->homePage;
    }

    public function setHomePage(bool $homePage): void
    {
        $this->homePage = $homePage;
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

    public function getPageBlockToDelete(): array
    {
        return $this->pageBlockToDelete;
    }

    public function setPageBlockToDelete(array $pageBlockToDelete): void
    {
        $this->pageBlockToDelete = $pageBlockToDelete;
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
            $clone = $pageBlock->isShared() ? $pageBlock : clone $pageBlock;
            return $clone;
        })->toArray());
    }
}
