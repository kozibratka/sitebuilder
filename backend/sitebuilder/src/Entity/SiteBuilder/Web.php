<?php


namespace App\Entity\SiteBuilder;


use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\Validator as AppValidator;

/**
 * @AppValidator\UniqueEntityWithUser(fields={"name", "user"})
 */
#[ORM\Table(name: 'web')]
#[ORM\UniqueConstraint(name: 'web_unique', columns: ['user_id', 'name'])]
#[ORM\Entity(repositoryClass: 'App\Repository\WebRepository')]
class Web
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * @Assert\NotBlank()
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
    #[ORM\OneToMany(targetEntity: PageBlock::class, mappedBy: 'web')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private Collection $pageBlocks;
    /**
     * @Assert\Valid()
     */
    #[ORM\OneToMany(targetEntity: 'App\Entity\SiteBuilder\Page', mappedBy: 'web', cascade: ['remove'], orphanRemoval: true)]
    private Collection $pages;

    #[ORM\OneToMany(targetEntity: 'App\Entity\SiteBuilder\Plugin\BasePlugin', mappedBy: 'web', cascade: ['remove'], orphanRemoval: true)]
    private Collection $plugins;

    #[ORM\Column(type: 'boolean')]
    private bool $isTemplate = false;
    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: Web::class)]
    private ?Web $parent;

    public function __construct()
    {
        $this->pages = new ArrayCollection();
        $this->plugins = new ArrayCollection();
        $this->pageBlocks = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
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

    public function getPages(): Collection
    {
        return $this->pages;
    }

    public function setPages(Collection $pages)
    {
        $this->pages = $pages;
    }

    public function addPage(Page $page) {
        $page->setWeb($this);
        $this->pages->add($page);
    }

    public function removePage(Page $page) {
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
    public function getAllWebBlocks(): array {
        return [...$this->getParent()?->getPageBlocks()->toArray() ?? [], ...$this->getPageBlocks()->toArray() ?? []];
    }
}
