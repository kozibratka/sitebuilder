<?php


namespace App\Repository;


use App\Entity\Web\Web;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class PageRepository extends EntityRepository
{
    public function getPagesPerWeb(Web $web): ?array {
        $qb = $this->createQueryBuilder('p');
        $qb
            ->join('p.web', 'w')
            ->andWhere('w = :web')
            ->andWhere('p.parentForPublic IS NULL')
            ->setParameter('web', $web)
        ;

        return $qb->getQuery()->getResult(Query::HYDRATE_ARRAY);
    }
}
