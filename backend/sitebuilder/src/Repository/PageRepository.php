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

    public function getForHostnamePath($hostname, $path) {
        $qb = $this->createQueryBuilder('p');
        $qb
            ->join('p.web', 'w')
            ->join('w.domains', 'd')
            ->andWhere('p.parentForPublic IS NULL')
            ->andWhere('d.name = :domain')
            ->setParameter('domain', $hostname)
        ;
        if (!$path) {
            $qb->andWhere('p.homePage = 1')
            ;
        } else {
            $qb->andWhere('p.url = :path')
                ->setParameter('path', $path)
            ;
        }
        return $qb->getQuery()->getOneOrNullResult();
    }
}
