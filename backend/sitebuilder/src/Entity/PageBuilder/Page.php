<?php

namespace App\Entity\PageBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

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
     */
    private User $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PageBuilder\PageBlock", mappedBy="page")
     */
    private Collection $pageBlocks;

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

    public function setPageBlocks(Collection $pageBlocks)
    {
        $this->pageBlocks = $pageBlocks;
    }
}
