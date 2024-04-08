<?php

namespace App\Interface;

use Symfony\Component\HttpFoundation\File\UploadedFile;

interface EntityFileProviderInterface
{
    public function getDestinationFilePath(): ?string;

    public function setFilePath(string $path);

    public function getFilePath(): ?string;

    public function getFile(): ?UploadedFile;
}