<?php


namespace App\Entity\PageBuilder\Plugin;


use App\Entity\PageBuilder\GridstackItem;
use Doctrine\ORM\Mapping as ORM;
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
     * @ORM\OneToMany(targetEntity="App\Entity\PageBuilder\GridstackItem", mappedBy="plugins")
     * @Serializer\Exclude()
     */
    private ?GridstackItem $gridstackItem;

    protected string $identifier;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getGridstackItem(): ?GridstackItem
    {
        return $this->gridstackItem;
    }

    public function setGridstackItem(?GridstackItem $gridstackItem)
    {
        $this->gridstackItem = $gridstackItem;
    }

    public function getIdentifier(): string
    {
        return $this->identifier;
    }

    public function setIdentifier(string $identifier)
    {
        $this->identifier = $identifier;
    }
}
