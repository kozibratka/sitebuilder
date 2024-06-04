<?php


namespace App\Entity\Plugin;

use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\Web\Web;
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
 *          "Carousel" = "App\Entity\Plugin\Carousel\PluginCarousel",
 *          "Text" = "App\Entity\Plugin\Text\PluginText",
 *          "Menu" = "App\Entity\Plugin\Menu\PluginMenu",
 *          "Image" = "App\Entity\Plugin\Image\PluginImage",
 *          "Video" = "App\Entity\Plugin\Video\PluginVideo",
 *          "Form" = "App\Entity\Plugin\Form\PluginForm"
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
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'plugins')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Web $web = null;
    /** @var ArrayCollection  */
    #[ORM\OneToMany(targetEntity: GridCellItem::class, mappedBy: 'plugin')]
    /**
     * @Serializer\Exclude()
     */
    private $gridCellItems;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $horizontalMargin = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $paddingBottom = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $paddingTop = null;


    public ?string $identifier = null;

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
        $this->gridCellItems = new ArrayCollection();
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

    public function addGridCellItem(GridCellItem $item)
    {
        $this->gridCellItems->add($item);
        $item->setPlugin($this);
    }

    public function removeGridCellItem(GridCellItem $item)
    {
        $this->gridCellItems->removeElement($item);
        $item->setPlugin(null);
    }

    public function getUser() {
        return $this->getWeb()?->getUser() ?? $this->getGridCellItems()[0]->getUser();
    }

    public function getHorizontalMargin(): ?int
    {
        return $this->horizontalMargin;
    }

    public function setHorizontalMargin(?int $horizontalMargin): void
    {
        $this->horizontalMargin = $horizontalMargin;
    }

    public function getPaddingBottom(): ?int
    {
        return $this->paddingBottom;
    }

    public function setPaddingBottom(?int $paddingBottom): void
    {
        $this->paddingBottom = $paddingBottom;
    }

    public function getPaddingTop(): ?int
    {
        return $this->paddingTop;
    }

    public function setPaddingTop(?int $paddingTop): void
    {
        $this->paddingTop = $paddingTop;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getWebId(): ?int {
        return $this->getWeb()?->getId();
    }

    public function __clone(): void
    {
        $this->gridCellItems = new ArrayCollection();
        if (!$this->web) {
            $this->id = null;
        }
    }
}
