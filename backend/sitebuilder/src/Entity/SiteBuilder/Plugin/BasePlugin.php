<?php


namespace App\Entity\SiteBuilder\Plugin;

use App\Entity\SiteBuilder\PaletteGridItem;
use App\Entity\SiteBuilder\Web;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

#[UniqueEntity(
    fields: ['name', 'web', 'identifier'],
    errorPath: 'name',
    message: 'This value is already used.',
)]
/**
 * @ORM\Entity
 * @ORM\Table(name="base_plugin")
 * @ORM\InheritanceType("JOINED")
 * @ORM\DiscriminatorColumn(name="pluginType", type="string")
 */
abstract class BasePlugin
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private ?int $id;

    /**
     * @ORM\Column(type="string", nullable=true)
     */
    private ?string $name = null;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\PaletteGridItem", mappedBy="plugin")
     * @Serializer\Exclude()
     */
    private Collection $paletteGridItems;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private ?User $user = null;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Web", inversedBy="plugins")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Serializer\Exclude()
     */
    private ?Web $web = null;

    public ?string $identifier = null;

    public function __construct()
    {
        $this->paletteGridItems = new ArrayCollection();
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

    public function setPaletteGridItems(Collection $paletteGridItems)
    {
        $this->paletteGridItems = $paletteGridItems;
    }

    public function addPaletteGridItem(PaletteGridItem $paletteGridItem)
    {
        if(!$this->paletteGridItems->contains($paletteGridItem)) {
            $this->paletteGridItems->add($paletteGridItem);
        }
    }

    public function removePaletteGridItem(PaletteGridItem $paletteGridItem) {
        $this->paletteGridItems->removeElement($paletteGridItem);
    }

    public function getIdentifier(): ?string
    {
        return $this->identifier;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
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
}
