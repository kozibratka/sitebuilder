<?php


namespace App\Entity\SiteBuilder;

use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

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
    private ?int $id = null;

    /**
     * @ORM\Column(type="integer", options={"default" : 1})
     * @Assert\NotBlank()
     */
    private $height = 1;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Page", inversedBy="pageBlocks")
     * @ORM\JoinColumn(onDelete="CASCADE")
     */
    private Page $page;

    /**
     * @ORM\OneToMany(targetEntity="PaletteGridItem", mappedBy="pageBlock", cascade={"persist"}, orphanRemoval=true)
     * @Assert\Valid()
     */
    private Collection $paletteGridItems;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private ?User $user = null;

    private string $uniqueId = '';

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
    }

    public function getId(): ?int
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

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
    }

    public function getHeight()
    {
        return $this->height;
    }

    public function setHeight($height)
    {
        $this->height = $height;
    }

    public function getUniqueId(): string
    {
        return $this->uniqueId;
    }

    public function setUniqueId(string $uniqueId)
    {
        $this->uniqueId = $uniqueId;
    }

    public function __clone(): void
    {
        $this->paletteGridItems = new ArrayCollection($this->paletteGridItems->map(function(PaletteGridItem $paletteGridItem) {
            $clone = clone $paletteGridItem;
            $clone->setPageBlock($this);
            return $clone;
        })->toArray());
    }
}
