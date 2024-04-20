<?php

namespace App\Entity\Plugin\Menu;
use App\Entity\Page\AbstractPage;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

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
    public function getPageUrl(): ?string
    {
        return $this->getPage()?->getUrl();
    }

    public function __clone(): void
    {
        $this->id = null;
    }
}
