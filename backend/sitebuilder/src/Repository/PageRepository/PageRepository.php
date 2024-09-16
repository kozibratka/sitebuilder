<?php


namespace App\Repository\PageRepository;


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
            ->setParameter('web', $web)
        ;

        return $qb->getQuery()->getResult(Query::HYDRATE_ARRAY);
    }
}
