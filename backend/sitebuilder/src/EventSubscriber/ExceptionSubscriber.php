<?php

namespace App\EventSubscriber;

use App\Exception\CustomErrorMessageException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class ExceptionSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents()
    {
        return [
            KernelEvents::EXCEPTION => [
                ['processCustomErrorMessageException']
            ],
        ];
    }

    public function processCustomErrorMessageException(ExceptionEvent $event)
    {
        $exception = $event->getThrowable();
        if(!$exception instanceof CustomErrorMessageException) {
            return;
        }

        $response = new Response();
        $response->setContent($exception->getMessage());
        $response->setStatusCode($exception->getStatusCode());
        $response->headers->replace($exception->getHeaders());
        $event->setResponse($response);
    }
}
