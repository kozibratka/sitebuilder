<?php

namespace App\Service\Doctrine;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Id\AbstractIdGenerator;
use Symfony\Component\Uid\Uuid;

class CustomUidGenerator extends AbstractIdGenerator
{
    public function generate(EntityManager $em, $entity)
    {
        return Uuid::v6()->toRfc4122(); // Vygeneruje UUID ve formátu stringu
    }
}