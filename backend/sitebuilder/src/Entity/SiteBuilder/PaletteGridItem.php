<?php


namespace App\Entity\SiteBuilder;


use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

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
    private int $id;

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
     */
    private int $x;

    /**
     * @ORM\Column(type="integer")
     */
    private int $y;

    /**
     * @ORM\OneToOne(targetEntity="App\Entity\SiteBuilder\Plugin\BasePlugin", inversedBy="paletteGridItem", cascade={"persist", "remove"})
     */
    private BasePlugin $plugin;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
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

    public function getX(): int
    {
        return $this->x;
    }

    public function setX(int $x)
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

    public function getPlugin(): BasePlugin
    {
        return $this->plugin;
    }

    public function setPlugin(BasePlugin $plugin)
    {
        $this->plugin = $plugin;
    }
}