<?php


namespace App\Controller\SiteBuilder;


use App\Controller\BaseApiController;
use App\Entity\Page\AbstractPage;
use App\Entity\Page\Page;
use App\Entity\Page\PublicPage;
use App\Entity\Plugin\BasePlugin;
use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockAssignment;
use App\Entity\Web\Web;
use App\Exception\CustomErrorMessageException;
use App\Form\PageType;
use App\Form\PublicPageType;
use App\Repository\PageRepository\PublicPageRepository;
use App\Service\PageService;
use Doctrine\ORM\EntityManagerInterface;
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
        $data['pageBlockAssignments'] = $page->getPageBlockAssignments();
        $data['id'] = $page->getId();
        $data['webBlocks'] = $page->getWebBlocks();

        return $this->jsonResponseSimple($data);
    }

    /**
     * @Route("/create/{id}", name="create")
     */
    public function create(Request $request, Web $web, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('page_builder_voter', $web);
        $form = $this->createForm(PageType::class);
        $form->submit($request->request->all());
        if($form->isSubmitted() && $form->isValid()) {
            /** @var Page $page */
            $page = $form->getData();
            $pageBlock = new PageBlock();
            $pageBlockAssignment = new PageBlockAssignment();
            $pageBlockAssignment->setPage($page);
            $pageBlockAssignment->setPageBlock($pageBlock);
            $page->addPageBlockAssignment($pageBlockAssignment);
            $web->addPage($page);
            if ($web->getPages()->count() == 1) {
                $page->setHomePage(true);
            }
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
        $form = $this->createForm(PageType::class, null, ['sync_by_id' => false, 'pageBuilder' => true]);
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
        $form->submit($request->request->all(), true);
        if($form->isSubmitted() && $form->isValid()) {
            $this->denyAccessUnlessGranted('page_builder_with_children_voter',$page);
            foreach ($oldGridItems as $gridCellItem) {
                if (!$gridCellItem->getCell()) {
                    $doctrine->getManager()->remove($gridCellItem);
                }
            }
            $this->flush();
            if ($withPublic) {
                $currentPublicPage = $doctrine->getRepository(PublicPage::class)->findOneBy(['parentForPublic' => $page->getId()]);
                if ($currentPublicPage) {
                    $page->setPublicPage(null);
                    $doctrine->getManager()->remove($currentPublicPage);
                }

                $publicPage = $page->createPublicPage();
                $this->persist($publicPage);
            }

//            $as = $page->getPageBlockAssignments()->first()->getPageBlock();
//            $as->refreshGridCellItemOrder();
//            dd($as);
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
            if ($publicPage = $page->getPublicPage()) {
                $formPublicPage = $this->createForm(PublicPageType::class, $publicPage, ['pageBuilder' => false]);
                $formPublicPage->submit($request->request->all(), false);
            }
            if ($page->isHomePage()) {
                $this->deselectHomePage($page);
            }
            $this->flush();
            return $this->jsonResponseSimple($page, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/clone/{id}", name="clone")
     */
    public function clone(Page $page)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$page);
        $clone = clone $page;
        $this->persist($clone);
        return new JsonResponse();
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Page $page)
    {
        if ($page->isHomePage()) {
            throw new CustomErrorMessageException('Nelze smazat přistávací stránku');
        }
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
     * @Route("/get-public", name="get_public")
     */
    public function getPagePublic(Request $request, EntityManagerInterface $entityManager)
    {
        $path = $request->query->get('url');
        $hostname = $request->query->get('hostname');
        $pageRepository = $entityManager->getRepository(PublicPage::class);
        $page = $pageRepository->getForHostnamePath($hostname, $path);
        if (!$page) {
            if (str_starts_with($hostname, 'www.')) {
                $hostnameTmp = substr($hostname, 4);
                $page = $pageRepository->getForHostnamePath($hostnameTmp, $path);
            }
            if (!$page && !str_starts_with($hostname, 'www.')) {
                $hostnameTmp = 'www.'.$hostname;
                $page = $pageRepository->getForHostnamePath($hostnameTmp, $path);
            }
        }

        return $this->jsonResponseSimple($page ?? [], 201);
    }

    private function deselectHomePage(Page $exceptPage) {
        $web = $exceptPage->getWeb();
        /** @var Page $page */
        foreach ($web->getPages() as $page) {
            if ($page === $exceptPage || $page === $exceptPage->getPublicPage()) {
                continue;
            }
            if ($page->isHomePage()) {
                $page->setHomePage(false);
                if ($publicPage = $page->getPublicPage()) {
                    $publicPage->setHomePage(false);
                }
            }
        }
    }
}
