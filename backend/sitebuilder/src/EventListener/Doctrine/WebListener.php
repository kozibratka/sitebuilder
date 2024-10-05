<?php

namespace App\EventListener\Doctrine;

use App\Entity\Web\Web;
use App\Service\Storage\StorageService;

class WebListener
{
    public function __construct(
        private StorageService $storageService
    )
    {
    }

    public function preRemove(Web $web)
    {
        if ($web->getImagePath()) {
            $this->storageService->removePublic($web->getImagePath());
        }
    }
}