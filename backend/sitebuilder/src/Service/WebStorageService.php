<?php

namespace App\Service;

use App\Entity\SiteBuilder\Web;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Security\Core\Security;

class WebStorageService
{
    public function __construct(
        private UserStorageService $userStorageService,
        private Security $security,
    ) {
        $this->filesystem = new Filesystem();
        $this->finder = new Finder();
    }

    public function uploadBlockImage(Web $web, UploadedFile $file, $name) {
        $realPath = $this->getUserWebServerRootStorage($web);
        $file->move($realPath, $name);
        return $this->getPublicPathFile($web, $name);
    }

    public function getPublicPathFile(Web $web, $name) {
        $path = $this->getUserWebServerRootStorage($web).'/'.$name;
        return str_replace($_SERVER['DOCUMENT_ROOT'], '', $path);
    }

    private function getUserWebServerRootStorage(Web $web) {
        $user = $this->security->getUser();
        $rootPath = $this->userStorageService->getRootServerStorage($user);
        $path = $rootPath.'/web/'.$web->getId();
        $this->filesystem->mkdir($path);
        return $path;
    }

}
