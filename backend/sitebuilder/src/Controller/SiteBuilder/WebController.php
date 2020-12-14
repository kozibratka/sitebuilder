<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Web;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page", name="web_")
 */
class WebController extends BaseApiController
{
    /**
     * @Route("/list", name="list")
     */
    public function list()
    {

    }

    /**
     * @Route("/create", name="create")
     */
    public function create(Request $request)
    {

    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Web $page)
    {

    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Web $page)
    {

    }
}
