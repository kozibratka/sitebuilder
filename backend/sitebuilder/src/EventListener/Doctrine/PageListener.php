<?php

namespace App\EventListener\Doctrine;

use App\Entity\Page;
use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\Event\OnFlushEventArgs;

class PageListener extends BaseListener
{
    public function prePersist(Page $page){
        if ($page->isHomePage()) {
            $this->deselectHomePage($page);
        } elseif ($page->getWeb()->getPages()->count() === 1) {
            $page->setHomePage(true);
        }
    }

    public function preRemove(Page $page){
        if ($page->isHomePage()) {
            throw new CustomErrorMessageException('Nelze smazat přistávací stránku');
        }
    }

    public function onFlush(OnFlushEventArgs $eventArgs) {
        $em = $eventArgs->getObjectManager();
        $uow = $em->getUnitOfWork();
        foreach ($uow->getScheduledEntityUpdates() as $entity) {
            if ($entity instanceof Page) {
                if ($entity->isHomePage() && $this->isPropertyChanged($eventArgs, $entity, 'homePage')) {
                    if($deselectedPages = $this->deselectHomePage($entity)) {
                        $this->recomputeSingleEntityChangeSet($eventArgs, $deselectedPages);
                    }

                }
            }
        }
    }

    private function deselectHomePage(Page $exceptPage) {
        $web = $exceptPage->getWeb();
        $pages = [];
        foreach ($web->getPages() as $page) {
            if ($page === $exceptPage) {
                continue;
            }
            if ($page->isHomePage()) {
                $page->setHomePage(false);
                $pages[] = $page;
            }
        }
        return $pages;
    }
}