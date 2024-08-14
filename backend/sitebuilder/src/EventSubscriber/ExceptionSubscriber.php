<?php

namespace App\EventSubscriber;

use App\Exception\CustomErrorMessageException;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Event\ExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Symfony\Component\RateLimiter\Exception\RateLimitExceededException;
use Symfony\Contracts\Translation\TranslatorInterface;

class ExceptionSubscriber implements EventSubscriberInterface
{

    public function __construct(
        private TranslatorInterface $translator
    )
    {
    }

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
        if($exception instanceof CustomErrorMessageException || $exception instanceof RateLimitExceededException) {
            $response = new Response();
            $response->setContent($this->translator->trans($exception->getMessage()));
            if ($exception instanceof RateLimitExceededException) {
                $response->setStatusCode(422);
            } else {
                $response->setStatusCode($exception->getStatusCode());
                $response->headers->replace($exception->getHeaders());
            }
            $event->setResponse($response);
        }
    }
}
