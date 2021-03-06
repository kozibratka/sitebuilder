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
 * @ORM\Table(name="web")
 */
class Web
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank()
     */
    private string $name;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\User")
     * @ORM\JoinColumn(onDelete="CASCADE")
     * @Gedmo\Blameable(on="create")
     * @Serializer\Exclude()
     */
    private User $user;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\Page", mappedBy="web", cascade={"remove"}, orphanRemoval=true)
     * @Serializer\Exclude()
     * @Assert\Valid()
     */
    private Collection $pages;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\SiteBuilder\Plugin\BasePlugin", mappedBy="web", cascade={"remove"}, orphanRemoval=true)
     * @Serializer\Exclude()
     */
    private Collection $plugins;

    public function __construct()
    {
        $this->pages = new ArrayCollection();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name)
    {
        $this->name = $name;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user)
    {
        $this->user = $user;
    }

    public function getPages(): Collection
    {
        return $this->pages;
    }

    public function setPages(Collection $pages)
    {
        $this->pages = $pages;
    }

    public function addPage(Page $page) {
        $page->setWeb($this);
        $this->pages->add($page);
    }

    public function removePage(Page $page) {
        $this->pages->removeElement($page);
    }

    public function getPlugins(): Collection
    {
        return $this->plugins;
    }

    public function setPlugins(Collection $plugins)
    {
        $this->plugins = $plugins;
    }
}
