<?php

namespace App\EventListener\Doctrine;

class BaseListener
{
    public function recomputeSingleEntityChangeSet($args, array|object $entity) {
        $em = $args->getEntityManager();
        $uow = $em->getUnitOfWork();
        if (!is_array($entity)) {
            $entity = [$entity];
        }
        foreach ($entity as $object) {
            $meta = $em->getClassMetadata(get_class($object));
            $uow->recomputeSingleEntityChangeSet($meta, $object);
        }
    }

    public function getChangeSet($args, object $entity) {
        $em = $args->getEntityManager();
        $uow = $em->getUnitOfWork();
        $uow->computeChangeSets(); // do not compute changes if inside a listener
        $changeset = $uow->getEntityChangeSet($entity);
        return $changeset;
    }

    public function isPropertyChanged($args, object $entity, string $property) {
        $changeSet = $this->getChangeSet($args, $entity);
        return isset($changeSet[$property]);
    }
}