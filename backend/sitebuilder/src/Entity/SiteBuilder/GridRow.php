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

    #[ORM\ManyToOne(targetEntity: PageBlock::class, inversedBy: 'rows')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private PageBlock $pageBlock;

    #[ORM\OneToMany(targetEntity: GridCell::class, mappedBy: 'row')]
    private Collection $cells;

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

    public function addCell($cell)
    {
        $this->cells->add($cell);
        $cell->setGridRow($this);
    }

    public function removeCell($cell)
    {
        $this->cells->removeElement($cell);
        $cell->setGridRow(null);
    }
}