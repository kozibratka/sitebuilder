<?php

namespace App\Entity\SiteBuilder;

use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'grid_cell_item')]
class GridCellItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id = null;
    #[ORM\ManyToOne(targetEntity: GridCell::class, inversedBy: 'items')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?GridCell $cell;

    #[ORM\OneToOne(targetEntity: GridRow::class, cascade: ['persist', 'remove'])]
    private ?GridRow $row = null;
    #[ORM\ManyToOne(targetEntity: BasePlugin::class, cascade: ['persist'], inversedBy: 'items')]
    private ?BasePlugin $plugin;

    #[ORM\Column(type: 'integer')]
    private int $itemOrder = 0;

    private string $uniqueId = '';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getRow(): ?GridRow
    {
        return $this->row;
    }

    public function setRow(?GridRow $row): void
    {
        $this->row = $row;
    }

    public function getPlugin(): ?BasePlugin
    {
        return $this->plugin;
    }

    public function setPlugin(?BasePlugin $plugin): void
    {
        $this->plugin = $plugin;
    }

    public function getCell(): ?GridCell
    {
        return $this->cell;
    }

    public function setCell(?GridCell $cell): void
    {
        $this->cell = $cell;
    }

    public function getItemOrder(): int
    {
        return $this->itemOrder;
    }

    public function setItemOrder(int $itemOrder): void
    {
        $this->itemOrder = $itemOrder;
    }

    public function getUniqueId(): string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(string $uniqueId): void
    {
        $this->uniqueId = $uniqueId;
    }

    public function __clone(): void
    {
        $this->id = null;
        if ($this->plugin) {
            $this->plugin = clone $this->plugin;
            $this->plugin->addGridCellItem($this);
        }
        if ($this->row) {
            $this->row = clone $this->row;
        }
    }
}