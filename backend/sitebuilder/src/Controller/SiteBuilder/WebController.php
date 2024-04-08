<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\Web\Web;
use App\Exception\CustomErrorMessageException;
use App\Form\Web\WebType;
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
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['user' => $user], ['id' => 'desc']);
        return $this->jsonResponseSimple($pages, group: 'base_list');
    }

    /**
     * @Route("/read/{id}", name="read")
     */
    public function read(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $web = $this->getDoctrine()->getRepository(Web::class)->getWebWithPages($web);
        return $this->jsonResponseSimple($web);
    }

    /**
     * @Route("/create/{id}", name="create")
     */
    public function create(Request $request, Web $web)
    {
        $validationWeb = new Web();
        $validationWeb->setUser($this->getUser());
        $form = $this->createForm(WebType::class, $validationWeb, ['allow_is_template' => $this->isGranted('ROLE_ADMIN')]);
        $form->submit($request->request->all());
        if($form->isValid() && !$web->getParent()) {
            $clone = clone $web;
            $clone->setParent($web);
            $clone->setIsTemplate(false);
            $clone->setName($form->get('name')->getData());
            //dd($clone);
            $this->persist($clone);
            return $this->jsonResponseSimple($clone, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_with_children_voter',$web);
        $form = $this->createForm(WebType::class, $web, ['allow_is_template' => $this->isGranted('ROLE_ADMIN')]);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $web = $form->getData();
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
        if (!$web->getParent()) {
            throw new CustomErrorMessageException('Nelze smazat web šablony');
        }
        $this->removeEntity($web);
        return new JsonResponse();
    }

    /**
     * @Route("/template-list", name="template_list")
     */
    public function templateList() {
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['isTemplate' => true]);
        return $this->jsonResponseSimple($pages, group: 'base_list');
    }
}
