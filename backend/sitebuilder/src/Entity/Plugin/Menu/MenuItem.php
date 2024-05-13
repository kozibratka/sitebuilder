<?php

namespace App\Entity\Plugin\Menu;
use App\Entity\Page\AbstractPage;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use JMS\Serializer\Annotation\MaxDepth;

#[ORM\Entity]
class MenuItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\ManyToOne(targetEntity: 'PluginMenu', inversedBy: 'items')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private PluginMenu $menu;

    #[ORM\ManyToOne(targetEntity: AbstractPage::class)]
    /**
     * @Serializer\Exclude()
     */
    private ?AbstractPage $page = null;

    #[ORM\Column(type: 'string')]
    private string $name = '';

    #[ORM\Column(type: 'integer')]
    private int $level = 0;

    public function getMenu(): PluginMenu
    {
        return $this->menu;
    }

    public function setMenu(PluginMenu $menu)
    {
        $this->menu = $menu;
    }

    public function getPage(): ?AbstractPage
    {
        return $this->page;
    }

    public function setPage(AbstractPage $page)
    {
        $this->page = $page;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getLevel(): int
    {
        return $this->level;
    }

    public function setLevel(int $level)
    {
        $this->level = $level;
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageDetail()
    {
        return [
            'pageUrl' => $this->getPage()?->getUrl(),
            'isHomepage' => $this->getPage()?->isHomePage(),
        ];
    }

    /**
     * @Serializer\VirtualProperty()
     */
    public function getPageId(): ?string
    {
        return $this->getPage()?->getId();
    }

    public function __clone(): void
    {
        $this->id = null;
    }
}
