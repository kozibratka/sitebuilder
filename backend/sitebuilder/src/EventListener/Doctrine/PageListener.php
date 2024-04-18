<?php

namespace App\EventListener\Doctrine;

use App\Entity\Page;
use App\Exception\CustomErrorMessageException;

class PageListener
{
    public function prePersist(Page $page){
        if ($page->isHomePage()) {
            $this->deselectHomePage($page);
        } elseif ($page->getWeb()->getPages()->count() === 1) {
            $page->setHomePage(true);
        }
    }

    public function preUpdate(Page $page){
        if ($page->isHomePage()) {
            $this->deselectHomePage($page);
        }
    }

    public function preRemove(Page $page){
        if ($page->isHomePage()) {
            throw new CustomErrorMessageException('Nelze smazat přistávací stránku');
        }
    }

    private function deselectHomePage(Page $exceptPage) {
        $web = $exceptPage->getWeb();
        foreach ($web->getPages() as $page) {
            if ($page === $exceptPage) {
                continue;
            }
            $page->setHomePage(false);
        }
    }
}