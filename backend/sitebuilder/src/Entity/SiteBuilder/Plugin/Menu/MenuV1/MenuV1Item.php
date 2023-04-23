<?php

namespace App\Entity\SiteBuilder\Plugin\Menu\MenuV1;
use App\Entity\SiteBuilder\Page;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class MenuV1Item
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="MenuV1", inversedBy="items")
     */
    private MenuV1 $menu;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Page")
     */
    private ?Page $page = null;

    /**
     * @ORM\Column(type="string")
     */
    private string $name = '';

    /**
     * @ORM\Column(type="integer")
     */
    private int $level = 0;

    public function getMenu(): MenuV1
    {
        return $this->menu;
    }

    public function setMenu(MenuV1 $menu)
    {
        $this->menu = $menu;
    }

    public function getPage(): ?Page
    {
        return $this->page;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getLevel(): int
    {
        return $this->level;
    }

    public function setLevel(int $level)
    {
        $this->level = $level;
    }
}
