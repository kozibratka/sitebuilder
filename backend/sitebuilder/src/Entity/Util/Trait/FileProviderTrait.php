<?php

namespace App\Entity\Util\Trait;

use Symfony\Component\HttpFoundation\File\UploadedFile;

trait FileProviderTrait
{
    public ?UploadedFile $file = null;
    private ?string $fileName = '';

    public function getFile(): ?UploadedFile
    {
        return $this->file;
    }

    public function setFile(?UploadedFile $file): void
    {
        $this->file = $file;
    }

    public function getFileName(): ?string
    {
        return $this->fileName;
    }

    public function setFileName(?string $fileName): void
    {
        $this->fileName = $fileName;
    }
}