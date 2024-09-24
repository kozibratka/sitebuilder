<?php

namespace App\Entity\SiteBuilder;

use App\Entity\Page\AbstractPage;
use App\Service\Doctrine\CustomUidGenerator;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'page_block_assignment')]
class PageBlockAssignment
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\Column(type: 'string', nullable: true)]
    #[ORM\CustomIdGenerator(CustomUidGenerator::class)]
    private ?string $id = null;

    #[ORM\ManyToOne(targetEntity: AbstractPage::class)]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?AbstractPage $page = null;
    #[Assert\Valid()]
    #[ORM\ManyToOne(targetEntity: PageBlock::class, cascade: ['persist'], inversedBy: 'pageBlockAssignments')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?PageBlock $pageBlock = null;

    #[ORM\Column(type: 'integer')]
    private int $orderItem = 0;

    private ?string $uniqueId = '';

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(?string $id): void
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