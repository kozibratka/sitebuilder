<?php


namespace App\Entity\PageBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;

/**
 * @ORM\Entity
 * @ORM\Table(name="page_block")
 */
class PageBlock
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\PageBuilder\Page", inversedBy="pageBlocks")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private Page $page;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\PageBuilder\GridstackItem", mappedBy="pageBlock", cascade={"persist"})
     */
    private Collection $gridstackItems;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private User $user;

    public function __construct()
    {
        $this->gridstackItems = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getPage(): Page
    {
        return $this->page;
    }

    public function setPage(Page $page)
    {
        $this->page = $page;
    }

    public function getGridstackItems(): Collection
    {
        return $this->gridstackItems;
    }

    public function addGridstackItem(GridstackItem $gridstackItem): self
    {
        $this->gridstackItems->add($gridstackItem);
        return $this;
    }

    public function removeGridstackItem(GridstackItem $gridstackItem): self
    {
        $this->gridstackItems->removeElement($gridstackItem);
        return $this;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
    }
}
