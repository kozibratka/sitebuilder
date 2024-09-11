<?php

namespace App\EventListener\Doctrine;

use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\Event\OnFlushEventArgs;

class PageListener extends BaseListener
{
}