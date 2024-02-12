<?php


namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

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
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'pageBlocks')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Web $web;

    /**
     * @Assert\Valid()
     */
    #[ORM\OneToMany(targetEntity: 'PaletteGridItem', mappedBy: 'pageBlock', cascade: ['persist'], orphanRemoval: true)]
    private Collection $paletteGridItems;

    /**
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: 'App\Entity\User')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?User $user = null;
    #[ORM\OneToMany(targetEntity: GridRow::class, mappedBy: 'pageBlock', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $rows;
    #[ORM\ManyToOne(targetEntity: PageBlockTemplateCategory::class)]
    private ?PageBlockTemplateCategory $category;

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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
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

    public function __clone(): void
    {
        $this->rows = new ArrayCollection($this->rows->map(function(GridRow $row) {
            $clone = clone $row;
            $clone->setPageBlock($this);
            return $clone;
        })->toArray());
    }
}
