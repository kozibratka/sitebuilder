<?php


namespace App\Entity\SiteBuilder;


use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Table(name: 'gridstack_item')]
#[ORM\Entity]
class PaletteGridItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    /**
     * @Serializer\Exclude()
     */
    #[ORM\ManyToOne(targetEntity: 'App\Entity\SiteBuilder\PageBlock', inversedBy: 'paletteGridItems')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private PageBlock $pageBlock;

    #[ORM\Column(type: 'integer')]
    private int $w;

    #[ORM\Column(type: 'integer')]
    private int $h;

    /**
     * @Assert\NotBlank()
     */
    #[ORM\Column(type: 'integer')]
    private ?int $x;

    #[ORM\Column(type: 'integer')]
    private int $y;

    #[ORM\ManyToOne(targetEntity: 'App\Entity\SiteBuilder\Plugin\BasePlugin', inversedBy: 'paletteGridItems', cascade: ['persist'])]
    private ?BasePlugin $plugin = null;

    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $diffGridAndContentBottomHeightPx = null;

    private string $uniqueId = '';
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

    public function getW(): int
    {
        return $this->w;
    }

    public function setW(int $w)
    {
        $this->w = $w;
    }

    public function getH(): int
    {
        return $this->h;
    }

    public function setH(int $h)
    {
        $this->h = $h;
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

    public function getPlugin(): ?BasePlugin
    {
        return $this->plugin;
    }

    public function setPlugin(?BasePlugin $plugin)
    {
        $this->plugin = $plugin;
        if($plugin) {
            $this->plugin->addPaletteGridItem($this);
        }
    }

    public function getDiffGridAndContentBottomHeightPx(): ?int
    {
        return $this->diffGridAndContentBottomHeightPx;
    }

    public function setDiffGridAndContentBottomHeightPx(?int $diffGridAndContentBottomHeightPx)
    {
        $this->diffGridAndContentBottomHeightPx = $diffGridAndContentBottomHeightPx;
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
        $this->plugin = clone $this->plugin;
    }
}
