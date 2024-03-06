<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PageBlockType;
use App\Form\SiteBuilder\WebType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;


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
            $clone->setName($form->get('name')->getData());
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
        $this->removeEntity($web);
        return new JsonResponse();
    }

    /**
     * @Route("/create-block-template/{id}", name="create_block_template")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function createBlockTemplate(Request $request, Web $web) {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $form = $this->createForm(PageBlockType::class, null, ['is_preview' => true, 'web' => $web->getId()]); //is_preview - ignore plugin id sync
        $form->submit(array_merge($request->request->all(), ['web' => $web->getId()]));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $this->persist($pageBlock);
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/template-list", name="template_list")
     */
    public function templateList() {
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['isTemplate' => true]);
        return $this->jsonResponseSimple($pages, group: 'base_list');
    }
}
