<?php

namespace App\Entity\Util\Interface;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface EntityFileProviderInterface
{
    public function getFile(): ?UploadedFile;

    public function getFileName(): ?string;
}