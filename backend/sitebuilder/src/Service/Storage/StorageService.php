<?php

namespace App\Service\Storage;

use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;

class StorageService
{
    private $fileSystem;


    public function __construct()
    {
        $this->fileSystem = new Filesystem();
    }

    public function upload($fullPath, $name, UploadedFile $file)
    {
        $this->fileSystem->mkdir($fullPath);
        $file->move($fullPath, $name);
        return self::getPublicPath($fullPath);
    }

    public function removePublic(string $publicPath)
    {
        $path = self::getFullPath($publicPath);
        $this->fileSystem->remove($path);

    }

    public function remove(string $fullPath)
    {
        $this->fileSystem->remove($fullPath);

    }
    public static function getPublicPath($path): string
    {
        return str_replace($_SERVER['DOCUMENT_ROOT'], '', $path);
    }

    public static function getFullPath($publicPath): string
    {
        return $_SERVER['DOCUMENT_ROOT'].$publicPath;
    }
}