<?php

namespace App\Entity\SiteBuilder;

use App\Entity\Page\Page;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'page_block_assignment')]
class PageBlockAssignment
{
    #[ORM\Id()]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Page::class)]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Page $page = null;
    #[Assert\Valid()]
    #[ORM\ManyToOne(targetEntity: PageBlock::class, cascade: ['persist'], inversedBy: 'pageBlockAssignments')]
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

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(?Page $page): void
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
        $oldPageBlock = $this->getPageBlock();
        $pageBlock->addPageBlockAssignment($this);
        if ($oldPageBlock && $pageBlock && $pageBlock !== $oldPageBlock) {
            $res = $oldPageBlock->getPageBlockAssignments()->removeElement($this);
//            dd($oldPageBlock->getPageBlockAssignments()->count());
//            dd( $this->pageBlock->getId());
        }
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