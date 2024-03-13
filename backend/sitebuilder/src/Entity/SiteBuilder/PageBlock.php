<?php


namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\Validator as AppAssert;

#[ORM\Table(name: 'page_block')]
#[ORM\Entity]
class PageBlock
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'integer', options: ['default' => 1])]
    private $height = 1;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\SiteBuilder\Page', inversedBy: 'pageBlocks')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Page $page = null;

    #[Assert\Expression(
        "this.getPage() or value",
        message: 'Web and Page is empty',
    )]
    #[AppAssert\PageBuilderUser]
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'pageBlocks')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    /**
     * @Serializer\Exclude()
     */
    private ?Web $web = null;

    /**
     * @Assert\Valid()
     */
    #[ORM\OneToMany(targetEntity: 'PaletteGridItem', mappedBy: 'pageBlock', cascade: ['persist'], orphanRemoval: true)]
    private Collection $paletteGridItems;
    #[ORM\OneToMany(targetEntity: GridRow::class, mappedBy: 'pageBlock', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $rows;
    #[ORM\ManyToOne(targetEntity: PageBlockTemplateCategory::class)]
    #[Assert\Expression(
        "this.getPage() or value",
        message: 'Category is required',
    )]
    private ?PageBlockTemplateCategory $category;

    #[ORM\Column(type: 'string', nullable: true)]
    private string $imagePath;

    private string $uniqueId = '';

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
        $this->rows = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page)
    {
        $this->page = $page;
    }

    public function getPaletteGridItems(): Collection
    {
        return $this->paletteGridItems;
    }

    public function addPaletteGridItem(PaletteGridItem $paletteGridItem): self
    {
        $paletteGridItem->setPageBlock($this);
        $this->paletteGridItems->add($paletteGridItem);
        return $this;
    }

    public function removePaletteGridItem(PaletteGridItem $paletteGridItem): self
    {
        $this->paletteGridItems->removeElement($paletteGridItem);
        return $this;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getUniqueId(): string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(string $uniqueId)
    {
        $this->uniqueId = $uniqueId;
    }

    public function getRows(): Collection
    {
        return $this->rows;
    }

    public function setRows(Collection $rows): void
    {
        $this->rows = $rows;
    }

    public function addRow(GridRow $row): self
    {
        $row->setPageBlock($this);
        $this->rows->add($row);
        return $this;
    }

    public function removeRow(GridRow $row): self
    {
        $this->rows->removeElement($row);
        return $this;
    }

    public function getWeb(): ?Web
    {
        return $this->web;
    }

    public function setWeb(?Web $web): void
    {
        $this->web = $web;
    }

    public function getCategory(): PageBlockTemplateCategory
    {
        return $this->category;
    }

    public function setCategory(PageBlockTemplateCategory $category): void
    {
        $this->category = $category;
    }

    public function getGridCellItems(): array
    {
        $gridCellItems = $this->rows->map(fn(GridRow $gridRow) => $gridRow->getGridCellItems())->toArray();
        return array_merge(...$gridCellItems);
    }

    public function refreshGridCellItemOrder()
    {
        /** @var GridRow $row */
        foreach ($this->rows as $row) {
            $row->refreshGridCellItemOrder();
        }
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    public function getUser() {
        return $this->getWeb()?->getUser() ?? $this->getPage()->getUser();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->rows = new ArrayCollection($this->rows->map(function(GridRow $row) {
            $clone = clone $row;
            $clone->setPageBlock($this);
            return $clone;
        })->toArray());
    }
}
