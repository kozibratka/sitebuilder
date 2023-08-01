<?php

namespace App\Repository;

use App\Entity\SiteBuilder\Web;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class WebRepository extends EntityRepository
{
    public function getWebWithPages(Web $web): ?array {
        $qb = $this->createQueryBuilder('w');
        $qb->select('w, p')
            ->leftJoin('w.pages', 'p')
            ->andWhere('w = :web')
            ->andWhere('p.parentForPublic IS NULL')
            ->setParameter('web', $web)
            ;

        return $qb->getQuery()->getOneOrNullResult(Query::HYDRATE_ARRAY);
    }
}
