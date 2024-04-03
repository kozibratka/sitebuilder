<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Exception\CustomErrorMessageException;
use App\Form\SiteBuilder\PageBlockType;
use App\Helper\Helper;
use App\Service\WebStorageService;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page-block-template", name="page_block_template_")
 */
class PageBlockTemplateController extends BaseApiController
{
    /**
     * @Route("/create", name="create")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function create(Request $request, WebStorageService $webStorageService) {
        $form = $this->createForm(PageBlockType::class, null, ['sync_by_id' => false, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $image = $request->files->get('image');
            if ($image) {
                $path = $webStorageService->uploadBlockImage($web, $image, Helper::randomString());
            } else {
                $image = $request->files->get('imageBase64');
                $path = $webStorageService->uploadBlockImage($web, $image, Helper::randomString(), true);
            }
            $pageBlock->setImagePath($path);
            $this->persist($pageBlock);
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function update(PageBlock $pageBlock, Request $request, WebStorageService $webStorageService) {
        $form = $this->createForm(PageBlockType::class, $pageBlock, ['sync_by_id' => true, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $image = $request->files->get('image');
            if ($image) {
                $path = $webStorageService->uploadBlockImage($web, $image, Helper::randomString());
            } else {
                $image = $request->files->get('imageBase64');
                $path = $webStorageService->uploadBlockImage($web, $image, Helper::randomString(), true);
            }
            $pageBlock->setImagePath($path);
            $this->flush();
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/delete/{id}", name="delete")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function delete(PageBlock $pageBlock, EntityManagerInterface $entityManager) {
        $web = $pageBlock->getWeb();
        if (!$web) {
            throw new CustomErrorMessageException('Není šablona');
        }
        $this->removeEntity($pageBlock);
        return $this->jsonResponseSimple($web->getPageBlocks(), 200);
    }

    /**
     * @Route("/category-list", name="category_list")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function categoryList(EntityManagerInterface $entityManager) {
        $category = $entityManager->getRepository(PageBlockTemplateCategory::class)->findAll();
        return $this->jsonResponseSimple($category, 201);
    }
}