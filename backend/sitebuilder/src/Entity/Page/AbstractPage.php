<?php

namespace App\Entity\Page;

use App\Constant\Limit;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockAssignment;
use App\Entity\Web\Web;
use App\Service\Doctrine\CustomUidGenerator;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Uid\Uuid;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\Validator as AppValidator;


#[UniqueEntity(
    fields: ['name', 'web'],
    errorPath: 'name',
)]
#[ORM\Table(name: 'page')]
#[ORM\Index(columns: ['url'], name: 'url')]
#[ORM\Entity()]
#[ORM\InheritanceType('SINGLE_TABLE')]
#[ORM\DiscriminatorColumn(name: 'type', type: 'string')]
#[ORM\DiscriminatorMap(['public' => PublicPage::class, 'private' => Page::class])]

abstract class AbstractPage
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'CUSTOM')]
    #[ORM\Column(type: 'string', nullable: true)]
    #[ORM\CustomIdGenerator(CustomUidGenerator::class)]

    protected ?string $id = null;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $name;


    #[AppValidator\CountTariff(
        type: 'blocks',
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[Assert\Valid()]
    #[ORM\OneToMany(targetEntity: PageBlockAssignment::class, mappedBy: 'page', cascade: ['persist', 'remove'], orphanRemoval: true)]
    public Collection $pageBlockAssignments;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'pages')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private Web $web;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'string')]
    private string $url = '';

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $description = '';

    #[ORM\Column(type: 'boolean')]
    private bool $homePage = false;

    private array $globalPlugins = [];

    public function __construct()
    {
        $this->pageBlockAssignments = new ArrayCollection();
    }

    public function getId(): ?string
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getPageBlockAssignments(): Collection
    {
        return $this->pageBlockAssignments;
    }

    public function addPageBlockAssignment(PageBlockAssignment $pageBlockAssignment) {
        $this->pageBlockAssignments->add($pageBlockAssignment);
        $pageBlockAssignment->setPage($this);
    }

    public function removePageBlockAssignment(PageBlockAssignment $pageBlockAssignment) {
        $this->pageBlockAssignments->removeElement($pageBlockAssignment);
        $pageBlockAssignment->setPage(null);
    }

    public function getWeb(): Web
    {
        return $this->web;
    }

    public function setWeb(Web $web)
    {
        $this->web = $web;
    }

    public function getGlobalPlugins(): array
    {
        return $this->globalPlugins;
    }

    public function setGlobalPlugins(array $globalPlugins)
    {
        $this->globalPlugins = $globalPlugins;
    }

    public function getUrl(): string
    {
        return $this->url;
    }

    public function setUrl(string $url)
    {
        $this->url = $url;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }

    public function isHomePage(): bool
    {
        return $this->homePage;
    }

    public function setHomePage(bool $homePage): void
    {
        $this->homePage = $homePage;
    }

    public function getGridCellItems(): array
    {
        $gridCellItems = $this->pageBlockAssignments->map(fn(PageBlockAssignment $pageBlockAssignment) => $pageBlockAssignment->getPageBlock()->getGridCellItems())->toArray();
        return array_merge(...$gridCellItems);
    }

    public function refreshGridCellItemOrder()
    {
        /** @var PageBlockAssignment $block */
        foreach ($this->pageBlockAssignments as $block) {
            $block->refreshGridCellItemOrder();
        }
    }

    public function getUser() {
        return $this->web?->getUser();
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getWebBlocks(): array {
        return $this->getWeb()->getAllWebBlocks();
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->pageBlockAssignments = new ArrayCollection($this->pageBlockAssignments->map(function(PageBlockAssignment $pageBlockAssignment) {
            $clone = clone $pageBlockAssignment;
            $clone->setPage($this);
            return $clone;
        })->toArray());
    }
}
