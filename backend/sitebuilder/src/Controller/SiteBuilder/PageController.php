<?php


namespace App\Controller\SiteBuilder;


use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PagePreviewType;
use App\Form\SiteBuilder\PageType;
use Doctrine\Persistence\ManagerRegistry;
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
        $pages = $this->getDoctrine()->getRepository(Page::class)->findBy(['web' => $web, 'isPreview' => false]);
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
    public function create(Request $request, Web $web, ManagerRegistry $doctrine)
    {
        $entityManager = $doctrine->getManager();
        $form = $this->createForm(PageType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            /** @var Page $page */
            $page = $form->getData();
            if ($page->getIsPreview()) {
                $previewPage = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['web' => $page->getWeb(), 'isPreview' => true]);
                if ($previewPage) {
                    $entityManager->remove($previewPage);
                }
            }
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
     * @Route("/get-preview", name="get_preview")
     */
    public function getPagePreview(Request $request)
    {
        $url = $request->request->get('url');
        $page = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['url' => $url, 'isPreview' => true]);
        if (!$page) {
            $page = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['url' => $url]);
        }

        return $this->jsonResponseSimple($page ?? [], 201);
    }

    /**
     * @Route("/get-public", name="get_public")
     */
    public function getPagePublic(Request $request)
    {
        $url = $request->request->get('url');
        $page = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['url' => $url, 'isPreview' => false]);

        return $this->jsonResponseSimple($page ?? [], 201);
    }
}
