<?php


namespace App\Controller\SiteBuilder;


use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PagePreviewType;
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
    public function read(Request $request, Page $page)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $page);
        $withGlobalPlugins = $request->query->get('withGlobalPlugins');
        if($withGlobalPlugins) {
            $globalPlugins = $this->getDoctrine()->getRepository(BasePlugin::class)->findBy(['web' => $page->getWeb()]);
            $page->setGlobalPlugins($globalPlugins);
        }

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
        $form->submit($request->request->all(), false);
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

    /**
     * @Route("/set-preview/{id}", name="set_preview")
     */
    public function setPagePreview(Request $request, Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $web);
        $form = $this->createForm(PagePreviewType::class, $web);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $web = $form->getData();
            $this->flush();
            return $this->jsonResponseSimple($web, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/get-preview/{id}", name="get_preview")
     */
    public function getPagePreview(Request $request, Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $web);
        $previewPath = $request->request->get('previewPath');
        if ($web->getPreviewPath() === $previewPath) {
            $pageJson = $web->getPagePreview();
            return JsonResponse::fromJsonString($pageJson);
        } else {
            $page = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['url' => $previewPath]);
            return $this->jsonResponseSimple($page);
        }
    }
}
