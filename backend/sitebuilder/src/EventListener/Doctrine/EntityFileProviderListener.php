<?php

namespace App\EventListener\Doctrine;
use App\Entity\Util\Attribute\FilePathAttr;
use App\Entity\Util\Interface\EntityFileProviderInterface;
use App\Helper\ClassInfoHelper;
use App\Service\Storage\StorageService;
use App\Service\Storage\WebStorageService;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreRemoveEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\PropertyAccess\PropertyAccess;

#[AsDoctrineListener(event: Events::prePersist)]
#[AsDoctrineListener(event: Events::preRemove)]
#[AsDoctrineListener(event: Events::preUpdate)]


class EntityFileProviderListener
{
    public function __construct(
    ){
        $this->filesystem = new Filesystem();
    }

    public function prePersist(PrePersistEventArgs $prePersistEventArgs): void
    {
        $entity = $prePersistEventArgs->getObject();
        if (!$entity instanceof EntityFileProviderInterface) {
            return;
        }
        $this->upload($entity);
    }

    public function preUpdate(PreUpdateEventArgs $preUpdateEventArgs) {
        $entity = $preUpdateEventArgs->getObject();
        if (!$entity instanceof EntityFileProviderInterface) {
            return;
        }
        $this->upload($entity, $preUpdateEventArgs);
    }

    public function upload(EntityFileProviderInterface $entity, PreUpdateEventArgs $preUpdateEventArgs = null) {
        $file = $entity->getFile();
        if (!$file) {
            return;
        }
        $propertyName = ClassInfoHelper::getPropertyForAttribute($entity, FilePathAttr::class)?->getName();
        if (!$propertyName) {
            throw new \Exception('Implementace fileProvider ale chybí attribute');
        }
        if ($preUpdateEventArgs) {
            if($preUpdateEventArgs->hasChangedField($propertyName)) {
                $oldPath = $preUpdateEventArgs->getOldValue($propertyName);
                if ($oldPath) {
                    $this->filesystem->remove(StorageService::getFullPath($oldPath));
                }
            }
        }
        $accessor = PropertyAccess::createPropertyAccessor();
        $publicPath = StorageService::getPublicPath($accessor->getValue($entity, $propertyName));
        $destPath = StorageService::getFullPath($publicPath);
        $name = $entity->getFileName();
        if (!$name && $file) {
            $name = $file->getClientOriginalName();
        }
        if (!$name) {
            throw new \Exception('Missing filled file name');
        }
        if ($destPath) {
            $this->filesystem->mkdir($destPath);
            $file->move($destPath, $name);
            $accessor->setValue($entity, $propertyName, $publicPath.'/'.$name);
        }
    }

    public function preRemove(PreRemoveEventArgs $preRemoveEventArgs): void
    {
        $entity = $preRemoveEventArgs->getObject();
        if (!$entity instanceof EntityFileProviderInterface) {
            return;
        }
        $accessor = PropertyAccess::createPropertyAccessor();
        $propertyName = ClassInfoHelper::getPropertyForAttribute($entity, FilePathAttr::class)?->getName();
        if ($propertyName) {
            $path = StorageService::getFullPath($accessor->getValue($entity, $propertyName));
            $this->filesystem->remove($path);
        }
    }
}