<?php

namespace App\Repository;

use App\Entity\Web\Web;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class WebRepository extends EntityRepository
{
    public function getWebWithPages(Web $web): ?array {
        $qb = $this->createQueryBuilder('w');
        $qb->select('w, p, domains')
            ->leftJoin('w.pages', 'p')
            ->leftJoin('w.domains', 'domains')
            ->andWhere('w = :web')
            ->setParameter('web', $web)
            ;

        return $qb->getQuery()->getOneOrNullResult(Query::HYDRATE_ARRAY);
    }
}
