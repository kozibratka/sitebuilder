<?php


namespace App\EventListener\Request;


use App\Helper\RequestHelper;
use Symfony\Component\HttpKernel\Event\RequestEvent;

class RequestJsonToArrayListener
{
    public function onKernelRequest(RequestEvent $requestEvent){
        $this->jsonContentToPost($requestEvent);
    }

    private function jsonContentToPost(RequestEvent $event)
    {
        $request = $event->getRequest();

        if (RequestHelper::isJsonRequest($request)) {
            $putJson = RequestHelper::getContentAsArray($request);
            $request->request->replace(is_array($putJson) ? $putJson : array());
        }
    }
}
