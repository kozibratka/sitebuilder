<?php


namespace App\Helper;


use Symfony\Component\HttpFoundation\Request;

class RequestHelper
{
    public static function isJsonRequest(Request $request): bool
    {
        if ($request->headers->get('Content-Type') == 'application/json') {
            return true;
        }

        return false;
    }

    public static function getContentAsArray(Request $request): ?array
    {
        $content = $request->getContent();

        if (empty($content)) {
            return [];
        }

        return json_decode($content, true);
    }
}
