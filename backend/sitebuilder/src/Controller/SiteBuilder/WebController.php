<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PagePreviewType;
use App\Form\SiteBuilder\WebType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("web", name="web_")
 */
class WebController extends BaseApiController
{
    /**
     * @Route("/list", name="list")
     */
    public function list()
    {
        $user = $this->getUser();
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['user' => $user]);
        return $this->jsonResponseSimple($pages);
    }

    /**
     * @Route("/read/{id}", name="read")
     */
    public function read(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        return $this->jsonResponseSimple($web, group: ['webDetail']);
    }

    /**
     * @Route("/create", name="create")
     */
    public function create(Request $request)
    {
        $form = $this->createForm(WebType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $web = $form->getData();
            $this->persist($web);
            return $this->jsonResponseSimple($web, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Web $web)
    {
        $form = $this->createForm(WebType::class, $web);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $web = $form->getData();
            $this->denyAccessUnlessGranted('page_builder_with_children_voter',$web);
            $this->flush();
            return $this->jsonResponseSimple($web, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $this->removeEntity($web);
        return new JsonResponse();
    }
}
