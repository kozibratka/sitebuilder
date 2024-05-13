<?php

namespace App\EventListener\Doctrine;

use App\Entity\Page\AbstractPage;
use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\Event\OnFlushEventArgs;

class PageListener extends BaseListener
{
}