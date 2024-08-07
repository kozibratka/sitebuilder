<?php

namespace App\Service;

use App\Entity\Page\AbstractPage;
use App\Entity\SiteBuilder\PageBlock;
use Doctrine\ORM\EntityManagerInterface;

class PageService
{

    public function __construct(
        private EntityManagerInterface $entityManager,
    ) {
    }

    public function removePageBlocks(AbstractPage $page)
    {
        /** @var PageBlock $block */
        foreach ($page->getPageBlockToDelete() as $block) {
            if (!$block->isShared()) {
                $this->entityManager->remove($block);
            }
        }
    }
}