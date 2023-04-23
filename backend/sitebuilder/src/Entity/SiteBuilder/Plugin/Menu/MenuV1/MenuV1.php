<?php

namespace App\Entity\SiteBuilder\Plugin\Menu\MenuV1;
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
     * @ORM\OneToMany(targetEntity="MenuV1Item", mappedBy="menu", cascade={"persist"}, orphanRemoval=true)
     */
    protected Collection $items;

    public function __construct()
    {
        parent::__construct();
        $this->items = new ArrayCollection();
    }
    public function setIdentifier()
    {
        $this->identifier = 'menu_v1';
    }

    public function getItems(): Collection
    {
        return $this->items;
    }

    public function setItems(Collection $items)
    {
        $this->items = $items;
    }

    public function addItem(MenuV1Item $menuSimpleItem): self
    {
        $this->items->add($menuSimpleItem);
        $menuSimpleItem->setMenu($this);
        return $this;
    }

    public function removeItem(MenuV1Item $menuSimpleItem): self
    {
        $this->items->removeElement($menuSimpleItem);
        return $this;
    }
}
