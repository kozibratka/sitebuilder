<?php


namespace App\Repository\PageRepository;


use App\Entity\Web\Web;
use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\Query;

class PublicPageRepository extends EntityRepository
{
    public function getForHostnamePath($hostname, $path) {
        $qb = $this->createQueryBuilder('p');
        $qb
            ->join('p.web', 'w')
            ->join('w.domains', 'd')
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
