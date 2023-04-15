<?php

namespace App\Entity\SiteBuilder\Plugin\MenuV1;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 */
class MenuV1 extends BasePlugin
{
    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\Plugin\MenuV1\MenuItemV1", mappedBy="menu", cascade={"persist"}, orphanRemoval=true)
     */
    protected Collection $items;

    public function __construct()
    {
        parent::__construct();
        $this->items = new ArrayCollection();
    }
    public function setIdentifier()
    {
        $this->identifier = 'menu_simple_plugin';
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function setItems(Collection $items)
    {
        $this->items = $items;
    }

    public function addMenuSimpleItem(MenuItemV1 $menuSimpleItem): self
    {
        $this->items->add($menuSimpleItem);
        $menuSimpleItem->setMenu($this);
        return $this;
    }

    public function removeMenuSimpleItem(MenuItemV1 $menuSimpleItem): self
    {
        $this->items->removeElement($menuSimpleItem);
        return $this;
    }
}
