<?php

namespace App\EventListener\Doctrine;
use App\Interface\EntityFileProviderInterface;
use Doctrine\Bundle\DoctrineBundle\Attribute\AsDoctrineListener;
use Doctrine\ORM\Event\PrePersistEventArgs;
use Doctrine\ORM\Event\PreRemoveEventArgs;
use Doctrine\ORM\Event\PreUpdateEventArgs;
use Doctrine\ORM\Events;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;

#[AsDoctrineListener(event: Events::prePersist)]
#[AsDoctrineListener(event: Events::preRemove)]
#[AsDoctrineListener(event: Events::preUpdate)]


class EntityFileProviderListener
{
    public function __construct(
        private ParameterBagInterface $parameterBag
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
        $this->upload($entity);
    }

    public function upload(EntityFileProviderInterface $entity) {
        $file = $entity->getFile();
        if (!$file) {
            return;
        }
        $destPath = $entity->getDestinationFilePath() ?? $this->parameterBag->get('kernel.project_dir').$entity->getFilePath();
        $exploded = explode('/', $destPath);
        $name = array_pop($exploded);
        $realPath = implode('/', $exploded);
        if ($file && $destPath) {
            $this->filesystem->mkdir($realPath);
            $file->move($realPath, $name);
            $publicPath = str_replace($this->parameterBag->get('kernel.project_dir'), '', $destPath);
            $entity->setFilePath($publicPath);
        }
    }

    public function preRemove(PreRemoveEventArgs $preRemoveEventArgs): void
    {
        $entity = $preRemoveEventArgs->getObject();
        if (!$entity instanceof EntityFileProviderInterface) {
            return;
        }
        $path = $entity->getFilePath();
        $this->filesystem->remove($path);
    }
}