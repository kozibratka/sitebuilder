<?php

namespace App\Entity\Page;

use App\Entity\SiteBuilder\PageBlock;
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

    public function getPublicPage()
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
        $page->pageBlocks = new ArrayCollection($this->pageBlocks->map(function(PageBlock $pageBlock) use($page) {
            $clone = clone $pageBlock;
            $clone->setPage($page);
            return $clone;
        })->toArray());
        return $page;
    }
}