<?php

namespace App\Entity\SiteBuilder;

use App\Constant\Limit;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'grid_cell')]
class GridCell
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id = null;
    #[ORM\Column(type: 'integer')]
    private int $width = 0;
    #[ORM\ManyToOne(targetEntity: GridRow::class, inversedBy: 'cells')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?GridRow $row;
    #[Assert\Count(
        max: Limit::CELL_ITEMS,
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\OneToMany(targetEntity: GridCellItem::class, mappedBy: 'cell', cascade: ['persist'])]
    #[ORM\OrderBy(["itemOrder" => "ASC"])]
    private Collection $items;

    private string $uniqueId = '';

    /**
     * @param int|null $id
     * @param int $width
     * @param Collection $items
     */
    public function __construct()
    {
        $this->items = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getWidth(): int
    {
        return $this->width;
    }

    public function setWidth(int $width): void
    {
        $this->width = $width;
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function setItems(Collection $items): void
    {
        $this->items = $items;
    }

    public function getRow(): GridRow
    {
        return $this->row;
    }

    public function setRow(?GridRow $row): void
    {
        $this->row = $row;
    }

    public function addItem(GridCellItem $item)
    {
        $this->items->add($item);
        $item->setCell($this);
    }

    public function removeItem(GridCellItem $item)
    {
        $this->items->removeElement($item);
        if ($item->getCell() === $this) {
            $item->setCell(null);
        }
    }

    public function getUniqueId(): string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(string $uniqueId): void
    {
        $this->uniqueId = $uniqueId;
    }

    public function getGridCellItemsWithDeep(): array
    {
        $gridCellItems = $this->getItems()->toArray();
        /** @var GridCellItem $gridCellItem */
        foreach ($gridCellItems as $gridCellItem) {
            if ($gridCellItem->getRow()) {
                $gridCellItems = array_merge($gridCellItems, $gridCellItem->getRow()->getGridCellItems());
            }
        }
        return $gridCellItems;
    }

    public function refreshGridCellItemOrder()
    {
        $iterator = $this->getItems()->getIterator();
        $iterator->uasort(function (GridCellItem $a, GridCellItem $b) {
            return ($a->getItemOrder() < $b->getItemOrder()) ? -1 : 1;
        });
        $this->items = new ArrayCollection(iterator_to_array($iterator));
        /** @var GridCellItem $item */
        foreach ($iterator as $item) {
            if ($row = $item->getRow()) {
                $row->refreshGridCellItemOrder();
            }
        }
    }

    public function getUser() {
        return $this->getRow()?->getUser();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->items = new ArrayCollection($this->items->map(function(GridCellItem $item) {
            $clone = clone $item;
            $clone->setCell($this);
            return $clone;
        })->toArray());
    }
}