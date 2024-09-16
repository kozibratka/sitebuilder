<?php

namespace App\Entity\Page;

use App\Repository\PageRepository\PublicPageRepository;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity(repositoryClass: PublicPageRepository::class)]
class PublicPage extends AbstractPage
{
    #[ORM\OneToOne(targetEntity: Page::class, inversedBy: 'publicPage')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    /**
     * @Serializer\Exclude()
     */
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