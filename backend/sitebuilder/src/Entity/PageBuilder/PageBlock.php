<?php


namespace App\Entity\PageBuilder;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="page_block")
 */
class PageBlock
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PageBuilder\Page", inversedBy="pageBlocks")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private Page $page;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PageBuilder\GridstackItem", mappedBy="pageBlock")
     */
    private Collection $gridstackItems;

    /**
     * @ORM\Column(type="integer")
     */
    private int $order;

    public function __construct()
    {
        $this->gridstackItems = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getPage(): Page
    {
        return $this->page;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    public function getGridstackItems(): Collection
    {
        return $this->gridstackItems;
    }

    public function setGridstackItems(Collection $gridstackItems)
    {
        $this->gridstackItems = $gridstackItems;
    }

    public function getOrder(): int
    {
        return $this->order;
    }

    public function setOrder(int $order)
    {
        $this->order = $order;
    }
}
