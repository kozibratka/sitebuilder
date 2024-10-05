<?php

namespace App\EventListener\Request;

use Symfony\Component\HttpKernel\Event\RequestEvent;

class RequestFileToFormFieldListener
{
    public function onKernelRequest(RequestEvent $requestEvent){
        $request = $requestEvent->getRequest();
        if($request->files->all()) {
            $files = $request->files->all();
            $request->request->add($files);
        }
    }
}