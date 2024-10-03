<?php

namespace App\Service\Storage;

class StorageService
{
    public static function getPublicPath($path): string
    {
        return str_replace($_SERVER['DOCUMENT_ROOT'], '', $path);
    }

    public static function getFullPath($publicPath): string
    {
        return $_SERVER['DOCUMENT_ROOT'].$publicPath;
    }
}