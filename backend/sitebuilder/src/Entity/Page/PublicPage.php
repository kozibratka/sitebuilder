<?php

namespace App\Entity\Page;

use App\Repository\PageRepository\PublicPageRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: PublicPageRepository::class)]
class PublicPage extends AbstractPage
{
    #[ORM\OneToOne(targetEntity: Page::class, inversedBy: 'publicPage')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    private ?Page $parentForPublic = null;

    public function getParentForPublic(): ?AbstractPage
    {
        return $this->parentForPublic;
    }

    public function setParentForPublic(?AbstractPage $parentForPublic): void
    {
        $this->parentForPublic = $parentForPublic;
    }
}