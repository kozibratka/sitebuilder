<?php

namespace App\Entity\SiteBuilder\Plugin\Menu;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginMenu extends BasePlugin
{
    #[ORM\OneToMany(targetEntity: 'MenuItem', mappedBy: 'menu', cascade: ['persist'], orphanRemoval: true)]
    protected Collection $items;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $logoName = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $logoImage = null;

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

    public function addItem(MenuItem $menuSimpleItem): self
    {
        $this->items->add($menuSimpleItem);
        $menuSimpleItem->setMenu($this);
        return $this;
    }

    public function removeItem(MenuItem $menuSimpleItem): self
    {
        $this->items->removeElement($menuSimpleItem);
        return $this;
    }

    public function getLogoName(): ?string
    {
        return $this->logoName;
    }

    public function setLogoName(?string $logoName)
    {
        $this->logoName = $logoName;
    }

    public function getLogoImage(): ?string
    {
        return $this->logoImage;
    }

    public function setLogoImage(?string $logoImage)
    {
        $this->logoImage = $logoImage;
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->items = new ArrayCollection($this->items->map(function(MenuItem $item) {
            $clone = clone $item;
            $clone->setMenu($this);
            return $clone;
        })->toArray());
    }
}
