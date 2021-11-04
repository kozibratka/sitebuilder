<?php


namespace App\Controller\SiteBuilder;


use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PageType;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page", name="page_")
 */
class PageController extends BaseApiController
{
    /**
     * @Route("/list/{id}", name="list")
     */
    public function list(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $pages = $this->getDoctrine()->getRepository(Page::class)->findBy(['web' => $web]);
        return $this->jsonResponseSimple($pages);
    }

    /**
     * @Route("/read/{id}", name="read")
     */
    public function read(Page $page)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $page);
        return $this->jsonResponseSimple($page);
    }

    /**
     * @Route("/create/{id}", name="create")
     */
    public function create(Request $request, Web $web)
    {
        $form = $this->createForm(PageType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $page = $form->getData();
            $web->addPage($page);
            $this->persist($page);
            return $this->jsonResponseSimple($page, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Page $page)
    {
        $form = $this->createForm(PageType::class, $page);
        $form->submit($request->request->all());
        if($form->isSubmitted() && $form->isValid()) {
            $this->denyAccessUnlessGranted('page_builder_with_children_voter',$page);
            $this->persist($page);
            return $this->jsonResponseSimple($page, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Page $page)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$page);
        $this->removeEntity($page);
        return new JsonResponse();
    }
}
