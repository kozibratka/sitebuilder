<?php

namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;
use App\Security\Validator as AppValidator;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 * @ORM\Table(name="page")
 * @AppValidator\UniqueEntityWithUser(fields={"name", "user"})
 */
#[UniqueEntity(
    fields: ['name', 'web'],
    errorPath: 'name',
)]
#[UniqueEntity(
    fields: ['url', 'web'],
    errorPath: 'url',
)]
class Page
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private string $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private ?User $user = null;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\PageBlock", mappedBy="page", cascade={"persist"}, orphanRemoval=true)
     * @Assert\Valid()
     */
    private Collection $pageBlocks;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Web", inversedBy="pages")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Serializer\Exclude()
     */
    private Web $web;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private string $url;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $description = '';

    private array $globalPlugins = [];

    public function __construct()
    {
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
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user)
    {
        $this->user = $user;
    }

    public function getPageBlocks(): Collection
    {
        return $this->pageBlocks;
    }

    public function addPageBlock(PageBlock $pageBlock) {
        $pageBlock->setPage($this);
        $this->pageBlocks->add($pageBlock);
    }

    public function removePageBlock(PageBlock $pageBlock) {
        $this->pageBlocks->removeElement($pageBlock);
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

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setDescription(?string $description)
    {
        $this->description = $description;
    }
}
