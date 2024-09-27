<?php

namespace App\Entity\Page;

use App\Entity\SiteBuilder\PageBlockAssignment;
use App\Repository\PageRepository\PageRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity(repositoryClass: PageRepository::class)]
class Page extends AbstractPage
{
    #[ORM\OneToOne(targetEntity: PublicPage::class, mappedBy: 'parentForPublic', cascade: ['remove'])]
    /**
     * @Serializer\Exclude()
     */
    private $publicPage;

    public function getPublicPage(): ?PublicPage
    {
        return $this->publicPage;
    }

    public function setPublicPage($publicPage): void
    {
        $this->publicPage = $publicPage;
    }
    public function createPublicPage() {
        $page = new PublicPage();
        $page->setHomePage($this->isHomePage());
        $page->setName($this->getName());
        $page->setWeb($this->getWeb());
        $page->setParentForPublic($this);
        $page->setUrl($this->getUrl());
        $page->setDescription($this->getDescription());
        $page->setGlobalPlugins($this->getGlobalPlugins());
        $originPageBlocks = $this->getPageBlockAssignments();
        $page->pageBlockAssignments = new ArrayCollection($originPageBlocks->map(function(PageBlockAssignment $pageBlockAssignment) use($page) {
            $clone = clone $pageBlockAssignment;
            $clone->setPage($page);
            return $clone;
        })->toArray());
        return $page;
    }

    public function __clone(): void
    {
        $this->id = null;
        $this->setHomePage(false);
        $pagesName = $this->getWeb()->getPages(true)->map(fn(AbstractPage $page) => $page->getName());
        $i = 1;
        while(true) {
            $name = $this->getName().' kopie '.$i++;
            if (!$pagesName->contains($name)) {
                $this->setName($name);
                break;
            }
        }
        $originPageBlocks = $this->getPageBlockAssignments();
        $this->pageBlockAssignments = new ArrayCollection($originPageBlocks->map(function(PageBlockAssignment $pageBlockAssignment) {
            $clone = clone $pageBlockAssignment;
            $clone->setPage($this);
            return $clone;
        })->toArray());
    }
}