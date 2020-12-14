<?php

namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity(repositoryClass="App\Repository\PageRepository")
 * @ORM\Table(name="page")
 */
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
     */
    private string $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private User $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\PageBlock", mappedBy="page", cascade={"persist"}, orphanRemoval=true)
     */
    private Collection $pageBlocks;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Web", inversedBy="pages")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Serializer\Exclude()
     */
    private Web $web;

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

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user)
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
}
