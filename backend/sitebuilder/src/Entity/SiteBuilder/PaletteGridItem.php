<?php


namespace App\Entity\SiteBuilder;


use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="gridstack_item")
 */
class PaletteGridItem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\PageBlock", inversedBy="paletteGridItems")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Serializer\Exclude()
     */
    private PageBlock $pageBlock;

    /**
     * @ORM\Column(type="integer")
     */
    private int $width;

    /**
     * @ORM\Column(type="integer")
     */
    private int $height;

    /**
     * @ORM\Column(type="integer")
     * @Assert\NotBlank()
     */
    private ?int $x;

    /**
     * @ORM\Column(type="integer")
     */
    private int $y;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\SiteBuilder\Plugin\BasePlugin", inversedBy="paletteGridItems", cascade={"persist"})
     * @Assert\Valid()
     */
    private BasePlugin $pluginGlobal;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\SiteBuilder\Plugin\BasePlugin", cascade={"persist", "remove"})
     */
    private BasePlugin $pluginLocal;

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getPageBlock(): PageBlock
    {
        return $this->pageBlock;
    }

    public function setPageBlock(PageBlock $pageBlock)
    {
        $this->pageBlock = $pageBlock;
    }

    public function getWidth(): int
    {
        return $this->width;
    }

    public function setWidth(int $width)
    {
        $this->width = $width;
    }

    public function getHeight(): int
    {
        return $this->height;
    }

    public function setHeight(int $height)
    {
        $this->height = $height;
    }

    public function getX(): ?int
    {
        return $this->x;
    }

    public function setX(?int $x)
    {
        $this->x = $x;
    }

    public function getY(): int
    {
        return $this->y;
    }

    public function setY(int $y)
    {
        $this->y = $y;
    }

    public function getPluginGlobal(): BasePlugin
    {
        return $this->pluginGlobal;
    }

    public function setPluginGlobal(BasePlugin $pluginGlobal)
    {
        $this->pluginGlobal = $pluginGlobal;
    }

    public function getPluginLocal(): BasePlugin
    {
        return $this->pluginLocal;
    }

    public function setPluginLocal(BasePlugin $pluginLocal)
    {
        $this->pluginLocal = $pluginLocal;
    }
}
