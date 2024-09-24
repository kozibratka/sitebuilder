<?php


namespace App\Entity\SiteBuilder;

use App\Constant\Limit;
use App\Entity\Page\AbstractPage;
use App\Entity\Web\Web;
use App\Interface\EntityFileProviderInterface;
use App\Security\Validator as AppAssert;
use App\Service\Doctrine\CustomUidGenerator;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\Validator as AppValidator;


#[ORM\Table(name: 'page_block')]
#[ORM\Entity]
class PageBlock implements EntityFileProviderInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\Column(type: 'string', nullable: true)]
    #[ORM\CustomIdGenerator(CustomUidGenerator::class)]
    private ?string $id = null;
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $height = null;
    /**
     * @var Collection|ArrayCollection
     */
    #[ORM\OneToMany(targetEntity: PageBlockAssignment::class, mappedBy: 'pageBlock')]
    private Collection $pageBlockAssignments;
    #[Assert\Expression(
        "this.getPageBlockAssignments().count() or value",
        message: 'Web and Page is empty',
    )]
    #[AppAssert\PageBuilderUser]
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'pageBlocks')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    /**
     * @Serializer\Exclude()
     */
    private ?Web $web = null;

    #[Assert\Valid()]
    #[ORM\OneToMany(targetEntity: 'PaletteGridItem', mappedBy: 'pageBlock', cascade: ['persist'], orphanRemoval: true)]
    private Collection $paletteGridItems;
    #[ORM\OneToMany(targetEntity: GridRow::class, mappedBy: 'pageBlock', cascade: ['persist', 'remove'], orphanRemoval: true)]
    #[AppValidator\CountTariff(
        type: 'rows',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[Assert\Valid()]
    private Collection $rows;
    #[Assert\Expression(
        "this.getPageBlockAssignments().count() or value",
        message: 'Category is required',
    )]
    #[ORM\ManyToOne(targetEntity: PageBlockTemplateCategory::class)]
    private ?PageBlockTemplateCategory $category;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $imagePath = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $backgroundImage = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $backgroundColor = null;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $backgroundVideo = null;

    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $grayScale = null;

    #[ORM\Column(type: 'smallint', nullable: true)]
    private ?int $opacity = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $paddingTop = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $paddingBottom = null;

    #[ORM\Column(type: 'boolean')]
    private bool $isShared = false;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $uniqueId = '';

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $name = '';

    /**
     * @Serializer\Exclude()
     */
    private $reassigned = false;

    private ?bool $isFromTemplateBlock = false;

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
        $this->rows = new ArrayCollection();
        $this->pageBlockAssignments = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId(string $id)
    {
        $this->id = $id;
    }

    public function getPaletteGridItems(): Collection
    {
        return $this->paletteGridItems;
    }

    public function addPaletteGridItem(PaletteGridItem $paletteGridItem): self
    {
        $paletteGridItem->setPageBlock($this);
        $this->paletteGridItems->add($paletteGridItem);
        return $this;
    }

    public function removePaletteGridItem(PaletteGridItem $paletteGridItem): self
    {
        $this->paletteGridItems->removeElement($paletteGridItem);
        return $this;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getUniqueId(): ?string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(?string $uniqueId)
    {
        $this->uniqueId = $uniqueId;
    }

    public function getRows(): Collection
    {
        return $this->rows;
    }

    public function setRows(Collection $rows): void
    {
        $this->rows = $rows;
    }

    public function addRow(GridRow $row): self
    {
        $row->setPageBlock($this);
        $this->rows->add($row);
        return $this;
    }

    public function removeRow(GridRow $row): self
    {
        $this->rows->removeElement($row);
        return $this;
    }

    public function getWeb(): ?Web
    {
        return $this->web;
    }

    public function setWeb(?Web $web): void
    {
        $this->web = $web;
    }

    public function getCategory(): ?PageBlockTemplateCategory
    {
        return $this->category;
    }

    public function setCategory(?PageBlockTemplateCategory $category): void
    {
        $this->category = $category;
    }

    public function getGridCellItems(): array
    {
        $gridCellItems = $this->rows->map(fn(GridRow $gridRow) => $gridRow->getGridCellItems())->toArray();
        return array_merge(...$gridCellItems);
    }

    public function refreshGridCellItemOrder()
    {
        /** @var GridRow $row */
        foreach ($this->rows as $row) {
            $row->refreshGridCellItemOrder();
        }
    }

    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }

    public function setImagePath(?string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    public function getUser() {
        return $this->getWeb()?->getUser() ?? $this->getPageBlockAssignments()->first()->getUser();
    }

    public function isFromTemplateBlock(): bool
    {
        return $this->isFromTemplateBlock;
    }

    public function setIsFromTemplateBlock(bool $isFromTemplateBlock): void
    {
        $this->isFromTemplateBlock = $isFromTemplateBlock;
    }

    public function getDestinationFilePath(): ?string
    {
        return null;
    }

    public function setFilePath(string $path)
    {
    }

    public function getFilePath(): ?string
    {
        return $this->imagePath;
    }

    public function getFile(): ?UploadedFile
    {
        return null;
    }

    public function getBackgroundImage(): ?string
    {
        return $this->backgroundImage;
    }

    public function setBackgroundImage(?string $backgroundImage): void
    {
        $this->backgroundImage = $backgroundImage;
    }

    public function getBackgroundColor(): ?string
    {
        return $this->backgroundColor;
    }

    public function setBackgroundColor(?string $backgroundColor): void
    {
        $this->backgroundColor = $backgroundColor;
    }

    public function getBackgroundVideo(): ?string
    {
        return $this->backgroundVideo;
    }

    public function setBackgroundVideo(?string $backgroundVideo): void
    {
        $this->backgroundVideo = $backgroundVideo;
    }

    public function getGrayScale(): ?int
    {
        return $this->grayScale;
    }

    public function setGrayScale(?int $grayScale): void
    {
        $this->grayScale = $grayScale;
    }

    public function getOpacity(): ?int
    {
        return $this->opacity;
    }

    public function setOpacity(?int $opacity): void
    {
        $this->opacity = $opacity;
    }

    public function getPaddingTop(): ?int
    {
        return $this->paddingTop;
    }

    public function setPaddingTop(?int $paddingTop): void
    {
        $this->paddingTop = $paddingTop;
    }

    public function getPaddingBottom(): ?int
    {
        return $this->paddingBottom;
    }

    public function setPaddingBottom(?int $paddingBottom): void
    {
        $this->paddingBottom = $paddingBottom;
    }

    public function isShared(): bool
    {
        return $this->isShared;
    }

    public function setIsShared(bool $isShared): void
    {
        $this->isShared = $isShared;
    }

    public function getPageBlockAssignments(): Collection
    {
        return $this->pageBlockAssignments;
    }

    public function setPageBlockAssignments(Collection $pageBlockAssignments): void
    {
        $this->pageBlockAssignments = $pageBlockAssignments;
    }

    public function addPageBlockAssignment(PageBlockAssignment $pageBlockAssignment)
    {
        if (!$this->pageBlockAssignments->contains($pageBlockAssignment)) {
            $this->pageBlockAssignments->add($pageBlockAssignment);
        }
        //$pageBlockAssignment->setPageBlock($this);
    }
    public function removePageBlockAssignment(PageBlockAssignment $pageBlockAssignment)
    {
        $this->pageBlockAssignments->removeElement($pageBlockAssignment);
        $pageBlockAssignment->setPageBlock(null);
    }

    public function isReassigned(): bool
    {
        return $this->reassigned;
    }

    public function setReassigned(bool $reassigned): void
    {
        $this->reassigned = $reassigned;
    }

    public function getName(): ?string
    {
        return $this->name;
    }
    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getWebId() {
        return $this->web?->getId();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->rows = new ArrayCollection($this->rows->map(function(GridRow $row) {
            $clone = clone $row;
            $clone->setPageBlock($this);
            return $clone;
        })->toArray());
    }
}
