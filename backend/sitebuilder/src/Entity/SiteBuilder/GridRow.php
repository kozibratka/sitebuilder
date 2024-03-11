<?php

namespace App\Entity\SiteBuilder;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'grid_row')]
class GridRow
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: PageBlock::class, inversedBy: 'rows', cascade: ['persist'])]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private PageBlock $pageBlock;

    #[ORM\OneToMany(targetEntity: GridCell::class, mappedBy: 'row', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $cells;

    private string $uniqueId = '';

    public function __construct()
    {
        $this->cells = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getPageBlock(): PageBlock
    {
        return $this->pageBlock;
    }

    public function setPageBlock(PageBlock $pageBlock): void
    {
        $this->pageBlock = $pageBlock;
    }

    public function getCells(): Collection
    {
        return $this->cells;
    }

    public function setCells(Collection $cells): void
    {
        $this->cells = $cells;
    }

    public function addCell(GridCell $cell)
    {
        $this->cells->add($cell);
        $cell->setRow($this);
    }

    public function removeCell(GridCell $cell)
    {
        $this->cells->removeElement($cell);
        $cell->setRow(null);
    }

    public function getUniqueId(): string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(string $uniqueId): void
    {
        $this->uniqueId = $uniqueId;
    }

    public function getGridCellItems(): array
    {
        $gridCellItems = $this->cells->map(fn(GridCell $gridCell) => $gridCell->getGridCellItemsWithDeep())->toArray();
        return array_merge(...$gridCellItems);
    }

    public function refreshGridCellItemOrder()
    {
        /** @var GridCell $cell */
        foreach ($this->cells as $cell) {
            $cell->refreshGridCellItemOrder();
        }
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->cells = new ArrayCollection($this->cells->map(function(GridCell $cell) {
            $clone = clone $cell;
            $clone->setRow($this);
            return $clone;
        })->toArray());
    }
}