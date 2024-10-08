<?php

namespace App\Entity\Plugin\Menu;
use App\Constant\Limit;
use App\Entity\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use App\Security\Validator as AppValidator;


#[ORM\Entity]
class PluginMenu extends BasePlugin
{
    #[AppValidator\CountTariff(
        type: 'pluginItems',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\OneToMany(targetEntity: PluginMenuItem::class, mappedBy: 'menu', cascade: ['persist'], orphanRemoval: true)]
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

    public function addItem(PluginMenuItem $menuSimpleItem): self
    {
        $this->items->add($menuSimpleItem);
        $menuSimpleItem->setMenu($this);
        return $this;
    }

    public function removeItem(PluginMenuItem $menuSimpleItem): self
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
        $this->items = new ArrayCollection($this->items->map(function(PluginMenuItem $item) {
            $clone = clone $item;
            $clone->setMenu($this);
            return $clone;
        })->toArray());
    }
}
