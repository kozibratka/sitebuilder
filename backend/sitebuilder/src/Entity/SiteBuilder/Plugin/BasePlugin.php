<?php


namespace App\Entity\SiteBuilder\Plugin;

use App\Entity\SiteBuilder\Web;
use App\Entity\User;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation as Gedmo;
use JMS\Serializer\Annotation as Serializer;

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
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\PaletteGridItem", mappedBy="pluginGlobal")
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
    private ?Web $web;

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

    public function getWeb(): Web
    {
        return $this->web;
    }

    public function setWeb(Web $web)
    {
        $this->web = $web;
    }
}
