<?php

namespace App\Entity\SiteBuilder;

use App\Entity\Page\AbstractPage;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'page_block_assignment')]
class PageBlockAssignment
{
    #[ORM\Id()]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: AbstractPage::class)]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?AbstractPage $page = null;
    #[ORM\ManyToOne(targetEntity: PageBlock::class, cascade: ['persist'])]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?PageBlock $pageBlock = null;

    #[ORM\Column(type: 'integer')]
    private int $orderItem = 0;

    private ?string $uniqueId = '';

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getPage(): ?AbstractPage
    {
        return $this->page;
    }

    public function setPage(?AbstractPage $page): void
    {
        $this->page = $page;
    }

    public function getOrderItem(): int
    {
        return $this->orderItem;
    }

    public function setOrderItem(int $orderItem): void
    {
        $this->orderItem = $orderItem;
    }

    public function getPageBlock(): ?PageBlock
    {
        return $this->pageBlock;
    }

    public function getUniqueId(): ?string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(?string $uniqueId): void
    {
        $this->uniqueId = $uniqueId;
    }

    public function setPageBlock(?PageBlock $pageBlock): void
    {
        $this->pageBlock = $pageBlock;
    }

    public function getUser() {
        return $this->getPage()?->getUser();
    }

    public function refreshGridCellItemOrder()
    {
        $this->getPageBlock()->refreshGridCellItemOrder();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->pageBlock = $this->pageBlock->isShared() ? $this->pageBlock : clone $this->pageBlock;
    }
}