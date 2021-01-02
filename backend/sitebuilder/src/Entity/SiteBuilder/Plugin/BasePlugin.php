<?php


namespace App\Entity\SiteBuilder\Plugin;


use App\Entity\SiteBuilder\PaletteGridItem;
use App\Entity\User;
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
    private int $id;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\SiteBuilder\PaletteGridItem", mappedBy="plugin")
     * @Serializer\Exclude()
     */
    private ?PaletteGridItem $paletteGridItem;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE", nullable=false)
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private ?User $user = null;

    public ?string $identifier = null;

    abstract public function setIdentifier();

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getPaletteGridItem(): ?PaletteGridItem
    {
        return $this->paletteGridItem;
    }

    public function setpaletteGridItem(?PaletteGridItem $paletteGridItem)
    {
        $this->paletteGridItem = $paletteGridItem;
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
}
