<?php

namespace App\Entity\SiteBuilder\Plugin\MenuSimple;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="menu_simple")
 */
class MenuSimple extends BasePlugin
{
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\Plugin\MenuSimple\MenuSimpleItem", mappedBy="menuSimple", cascade={"persist"}, orphanRemoval=true)
     */
    protected Collection $menuSimpleItems;

    public function __construct()
    {
        parent::__construct();
        $this->menuSimpleItems = new ArrayCollection();
    }
    public function setIdentifier()
    {
        $this->identifier = 'menu_simple_plugin';
    }

    public function getMenuSimpleItems(): Collection
    {
        return $this->menuSimpleItems;
    }

    public function setMenuSimpleItems(Collection $menuSimpleItems)
    {
        $this->menuSimpleItems = $menuSimpleItems;
    }

    public function addMenuSimpleItem(MenuSimpleItem $menuSimpleItem): self
    {
        $this->menuSimpleItems->add($menuSimpleItem);
        $menuSimpleItem->setMenuSimple($this);
        return $this;
    }

    public function removeMenuSimpleItem(MenuSimpleItem $menuSimpleItem): self
    {
        $this->menuSimpleItems->removeElement($menuSimpleItem);
        return $this;
    }
}
