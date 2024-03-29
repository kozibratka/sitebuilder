<?php


namespace App\Controller\SiteBuilder;


use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\Page;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PageType;
use Doctrine\Persistence\ManagerRegistry;
use Predis\Client;
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
        $pages = $this->getDoctrine()->getRepository(Page::class)->getPagesPerWeb($web);
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
        $form = $this->createForm(PageType::class);
        $form->submit($request->request->all());
        if($form->isSubmitted() && $form->isValid()) {
            /** @var Page $page */
            $page = $form->getData();
            $page->addPageBlock(new PageBlock());
            $web->addPage($page);
            $this->persist($page);
            return $this->jsonResponseSimple($page, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/create-preview/{id}", name="create_preview")
     */
    public function createPreview(Request $request, Web $web, \Predis\Client $client)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $web);
        $form = $this->createForm(PageType::class, null, ['sync_by_id' => false]);
        $form->submit($request->request->all(), false);
        if($form->isSubmitted() && $form->isValid()) {
            /** @var Page $page */
            $page = $form->getData();
            $page->setWeb($web);
            $this->denyAccessUnlessGranted('page_builder_with_children_voter',$page);
            $jsonPage = $this->serializer->serialize($page, 'json');
            $res = $client->set('page_preview_'.$web->getId(), $jsonPage, 'EX', 3600);
            return $this->jsonResponseSimple([], 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update-page-builder/{id}", name="update_page_builder")
     */
    public function update(Request $request, Page $page, ManagerRegistry $doctrine)
    {
        $withPublic = $request->query->get('withPublic');
        $form = $this->createForm(PageType::class, $page, ['pageBuilder' => true]);
        /** @var GridCellItem[] $oldGridItems */
        $oldGridItems = [];
        if ($request->isMethod('post')) {
            $oldGridItems = $page->getGridCellItems();
        }
        $form->submit($request->request->all(), false);
        if($form->isSubmitted() && $form->isValid()) {
            $this->denyAccessUnlessGranted('page_builder_with_children_voter',$page);
            foreach ($oldGridItems as $gridCellItem) {
                if (!$gridCellItem->getCell()) {
                    $doctrine->getManager()->remove($gridCellItem);
                }
            }
            $this->flush();
            if ($withPublic) {
                $currentPublicPage = $doctrine->getRepository(Page::class)->findOneBy(['parentForPublic' => $page->getId()]);
                if ($currentPublicPage) {
                    $doctrine->getManager()->remove($currentPublicPage);
                }
                $clonePage = clone $page;
                $clonePage->setParentForPublic($page);
                $this->persist($clonePage);
            }
            $page->refreshGridCellItemOrder();
            return $this->jsonResponseSimple($page, 201);
        }

        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update-page/{id}", name="update_page")
     */
    public function updatePage(Request $request, Page $page, ManagerRegistry $doctrine)
    {
        $form = $this->createForm(PageType::class, $page, ['pageBuilder' => false]);
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
     * @Route("/get-preview/{id}", name="get_preview")
     */
    public function getPagePreview(Request $request, Web $web, Client $client)
    {
        $page = $client->get('page_preview_'.$web->getId());

        return new JsonResponse($page, json: true);
    }

    /**
     * @Route("/get-public/{domain}", name="get_public")
     */
    public function getPagePublic(Request $request, string $domain)
    {
        $url = $request->request->get('url');
        $page = $this->getDoctrine()->getRepository(Page::class)->findOneBy(['url' => $url]);

        return $this->jsonResponseSimple($page ?? [], 201);
    }
}
