<?php


namespace App\Entity\SiteBuilder\Plugin;

use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\Web;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[UniqueEntity(
    fields: ['name', 'web'],
    errorPath: 'name',
    message: 'This value is already used.',
)]

#[ORM\Entity]
#[ORM\Table(name:'base_plugin')]
#[ORM\InheritanceType('JOINED')]
#[ORM\DiscriminatorColumn(name:'pluginType', type:'string')]
/**
 * @Serializer\Discriminator(
 *     field = "pluginType",
 *     disabled = false,
 *     map = {
 *          "Carousel" = "App\Entity\SiteBuilder\Plugin\Carousel\PluginCarousel",
 *          "Text" = "App\Entity\SiteBuilder\Plugin\Text\PluginText",
 *          "Menu" = "App\Entity\SiteBuilder\Plugin\Menu\PluginMenu",
 *          "Image" = "App\Entity\SiteBuilder\Plugin\Image\PluginImage",
 *          "Video" = "App\Entity\SiteBuilder\Plugin\Video\PluginVideo",
 *          "Form" = "App\Entity\SiteBuilder\Plugin\Form\PluginForm"
 *
 *     })
 */
abstract class BasePlugin
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $name = null;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: 'App\Entity\SiteBuilder\Web', inversedBy: 'plugins')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Web $web = null;
    /** @var ArrayCollection  */
    #[ORM\OneToMany(targetEntity: GridCellItem::class, mappedBy: 'plugin', cascade: ['persist'])]
    private $gridCellItems;

    public ?string $identifier = null;

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
        $this->items = new ArrayCollection();
    }

    abstract public function setIdentifier();

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id)
    {
        $this->id = $id;
    }

    public function getPaletteGridItems(): Collection
    {
        return $this->paletteGridItems;
    }

    public function getIdentifier(): ?string
    {
        return $this->identifier;
    }

    public function getWeb(): ?Web
    {
        return $this->web;
    }

    public function setWeb(?Web $web)
    {
        $this->web = $web;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name)
    {
        $this->name = $name;
    }

    public function getGridCellItems(): Collection
    {
        return $this->gridCellItems;
    }

    public function setGridCellItems(Collection $items): void
    {
        $this->gridCellItems = $items;
    }

    /**
     * @param mixed $item
     */
    public function addGridCellItem(GridCellItem $item)
    {
        $this->gridCellItems->add($item);
        $item->setPlugin($this);
    }

    /**
     * @param mixed $item
     */
    public function removeGridCellItem($item)
    {
        $this->items->removeElement($item);
        $item->setBasePlugin(null);
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getWebId(): ?int {
        return $this->getWeb()?->getId();
    }

    public function __clone(): void
    {
        $this->items = new ArrayCollection();
        if (!$this->web) {
            $this->id = null;
        }
    }
}
