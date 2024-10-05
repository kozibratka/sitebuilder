<?php

namespace App\EventListener\Doctrine\PageBuilder;

use App\Entity\SiteBuilder\PageBlock;
use App\Service\Storage\StorageService;

class PageBlockListener
{

    public function __construct(
        private StorageService $storageService
    )
    {
    }

    public function preRemove(PageBlock $pageBlock)
    {
        if ($pageBlock->getImagePath()) {
            $this->storageService->removePublic($pageBlock->getImagePath());
        }
    }
}