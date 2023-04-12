<?php

namespace App\Entity\SiteBuilder\Plugin\MenuSimple;
use App\Entity\SiteBuilder\Page;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="menu_simple_item")
 */
class MenuSimpleItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Plugin\MenuSimple\MenuSimple", inversedBy="menuSimpleItems")
     */
    private MenuSimple $menuSimple;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Page")
     */
    private Page $page;

    /**
     * @ORM\Column(type="string")
     */
    private string $name = '';

    /**
     * @ORM\Column(type="integer")
     */
    private int $level = 0;

    public function getMenuSimple(): MenuSimple
    {
        return $this->menuSimple;
    }

    public function setMenuSimple(MenuSimple $menuSimple)
    {
        $this->menuSimple = $menuSimple;
    }

    public function getPage(): Page
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
