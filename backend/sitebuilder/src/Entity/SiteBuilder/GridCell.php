<?php

namespace App\Entity\SiteBuilder;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

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
    private GridRow $row;
    #[ORM\OneToMany(targetEntity: GridCellItem::class, mappedBy: 'cell')]
    private Collection $items;

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

    public function setRow(GridRow $row): void
    {
        $this->row = $row;
    }

    public function addItem($item)
    {
        $this->items->add($item);
        $item->setGridCell($this);
    }

    public function removeItem($item)
    {
        $this->items->removeElement($item);
        $item->setGridCell(null);
    }
}