<?php


namespace App\Entity\Web;


use App\Entity\Page\AbstractPage;
use App\Entity\Plugin\BasePlugin;
use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\User;
use App\Security\Validator as AppValidator;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use Gedmo\Mapping\Annotation\Timestampable;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @AppValidator\UniqueEntityWithUser(fields={"name", "user"})
 */
#[ORM\Table(name: 'web')]
#[ORM\UniqueConstraint(name: 'web_unique', columns: ['user_id', 'name'])]
#[ORM\Entity(repositoryClass: 'App\Repository\WebRepository')]
class Web
{
    /**
     * @Serializer\Groups({"default", "base_list"})
     */
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * @Assert\NotBlank()
     * @Serializer\Groups({"default", "base_list"})
     */
    #[ORM\Column(type: 'string')]
    private string $name = '';

    /**
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: 'App\Entity\User', inversedBy: 'webs')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?User $user = null;

    #[ORM\Column(type: 'datetime')]
    #[Timestampable(on: 'create')]
    #[Serializer\Type("DateTime<'d-m-Y H:i:s'>")]
    private $createdAt;
    #[ORM\OneToMany(targetEntity: PageBlock::class, mappedBy: 'web')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private Collection $pageBlocks;
    /**
     * @Assert\Valid()
     */
    #[ORM\OneToMany(targetEntity: AbstractPage::class, mappedBy: 'web', cascade: ['remove', 'persist'], orphanRemoval: true)]
    private Collection $pages;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\OneToMany(targetEntity: BasePlugin::class, mappedBy: 'web', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $plugins;
    /**
     * @Serializer\Groups({"default", "base_list"})
     */
    #[ORM\Column(type: 'boolean')]
    private bool $isTemplate = false;
    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: Web::class)]
    private ?Web $parent = null;

    /**
     * @Serializer\Groups({"default", "base_list"})
     */
    #[ORM\Column(type: 'string', nullable: true)]
    private string $imagePath;
    /** @var Collection|ArrayCollection  */
    #[ORM\OneToMany(targetEntity: Domain::class, cascade: ['persist', 'remove'], orphanRemoval: true, mappedBy: 'web')]
    /**
     * @Assert\Valid()
     */
    private Collection $domains;

    public function __construct()
    {
        $this->pages = new ArrayCollection();
        $this->plugins = new ArrayCollection();
        $this->pageBlocks = new ArrayCollection();
        $this->domains = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id)
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

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    /**
     * @return Collection<AbstractPage>
     */
    public function getPages(): Collection
    {
        return $this->pages;
    }

    public function setPages(Collection $pages)
    {
        $this->pages = $pages;
    }

    public function addPage(AbstractPage $page) {
        $page->setWeb($this);
        $this->pages->add($page);
    }

    public function removePage(AbstractPage $page) {
        $this->pages->removeElement($page);
    }

    public function getPlugins(): Collection
    {
        return $this->plugins;
    }

    public function setPlugins(Collection $plugins)
    {
        $this->plugins = $plugins;
    }

    public function getPagePreview(): ?string
    {
        return $this->pagePreview;
    }

    public function setPagePreview(?string $pagePreview)
    {
        $this->pagePreview = $pagePreview;
    }

    public function getPreviewPath(): ?string
    {
        return $this->previewPath;
    }

    public function setPreviewPath(?string $previewPath)
    {
        $this->previewPath = $previewPath;
    }

    public function getPageBlocks(): Collection
    {
        return $this->pageBlocks;
    }

    public function setPageBlocks(Collection $pageBlocks): void
    {
        $this->pageBlocks = $pageBlocks;
    }

    public function isTemplate(): bool
    {
        return $this->isTemplate;
    }

    public function setIsTemplate(bool $isTemplate): void
    {
        $this->isTemplate = $isTemplate;
    }

    public function getParent(): ?Web
    {
        return $this->parent;
    }

    public function setParent(?Web $parent): void
    {
        $this->parent = $parent;
    }

    public function getImagePath(): string
    {
        return $this->imagePath;
    }

    public function setImagePath(string $imagePath): void
    {
        $this->imagePath = $imagePath;
    }

    public function getDomains(): Collection
    {
        return $this->domains;
    }

    public function setDomains(Collection $domains): void
    {
        $this->domains = $domains;
    }

    /**
     * @param mixed $domain
     */
    public function addDomain($domain)
    {
        $this->domains->add($domain);
        $domain->setWeb($this);
    }

    /**
     * @param mixed $domain
     */
    public function removeDomain(Domain $domain)
    {
        $this->domains->removeElement($domain);
    }

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt): void
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function parent() {
        return $this->parent?->getId();
    }

    public function getAllWebBlocks(): array {
        return [...$this->getParent()?->getPageBlocks()->toArray() ?? [], ...$this->getPageBlocks()->toArray() ?? []];
    }

    public function __clone() {
        $this->setId(null);
        $this->pageBlocks = new ArrayCollection();
        $globalPluginsPerId = [];
        $this->plugins = new ArrayCollection($this->plugins->map(function(BasePlugin $plugin) use(&$globalPluginsPerId) {
            $clone = clone $plugin;
            $globalPluginsPerId[$plugin->getId()] = $clone;
            $clone->setId(null);
            $clone->setWeb($this);
            return $clone;
        })->toArray());
        $newPages = new ArrayCollection();
        /** @var AbstractPage $page */
        foreach ($this->pages as $page) {
            if($page->getParentForPublic()) {
                continue;
            }
            $newPage = clone $page;
            $newPage->setWeb($this);
            $cellItems = $newPage->getGridCellItems();
            /** @var GridCellItem $item */
            foreach ($cellItems as $item) {
                $plugin = $item->getPlugin();
                if ($plugin && $plugin->getId() && isset($globalPluginsPerId[$plugin->getId()])) {
                    $globalPluginsPerId[$plugin->getId()]->addGridCellItem($item);
                }
            }
            $newPages->add($newPage);
        }
        $this->setPages($newPages);

    }
}
