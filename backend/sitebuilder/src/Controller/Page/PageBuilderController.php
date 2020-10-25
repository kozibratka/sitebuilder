<?php


namespace App\Controller\Page;


use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class PageBuilder
 * @package App\Controller
 * @Route("/page-builder", name="page_builder_")
 */
class PageBuilderController extends AbstractController
{
    /**
     * @Route("/list-pages", name="list_pages")
     */
    public function listPages()
    {

    }
}
