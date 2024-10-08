<?php

namespace App\Entity\SiteBuilder;

use App\Service\Doctrine\CustomUidGenerator;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Validator as AppValidator;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'grid_row')]
class GridRow
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\Column(type: 'string', nullable: true)]
    #[ORM\CustomIdGenerator(CustomUidGenerator::class)]
    private ?string $id = null;

    #[ORM\ManyToOne(targetEntity: PageBlock::class, inversedBy: 'rows')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private PageBlock $pageBlock;
    #[AppValidator\CountTariff(
        type: 'cells',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[Assert\Valid()]
    #[ORM\OneToMany(targetEntity: GridCell::class, mappedBy: 'row', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $cells;

    private string $uniqueId = '';

    public function __construct()
    {
        $this->cells = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): void
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

    public function getUser() {
        return $this->getPageBlock()?->getUser();
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