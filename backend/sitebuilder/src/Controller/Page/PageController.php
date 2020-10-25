<?php


namespace App\Controller\Page;


use App\Entity\Page;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class PageController
 * @package App\Controller\Page
 * @Route("page", name="page_")
 */
class PageController extends AbstractController
{
    /**
     * @Route("/list", name="list")
     */
    public function list()
    {
        $this->getDoctrine()->getRepository(Page::class)->findAll();
    }
}
