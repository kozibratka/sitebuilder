<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Entity\Web\Web;
use App\Exception\CustomErrorMessageException;
use App\Form\SiteBuilder\PageBlockType;
use App\Helper\Helper;
use App\Helper\ImageHelper;
use App\Service\Storage\StorageService;
use App\Service\Storage\WebStorageService;
use Doctrine\ORM\EntityManagerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Security;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page-block", name="page_block_")
 */
class PageBlockController extends BaseApiController
{
    /**
     * @Route("/create", name="create")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function create(Request $request, WebStorageService $webStorageService, StorageService $storageService) {
        $form = $this->createForm(PageBlockType::class, null, ['sync_by_id' => false, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $this->uploadImage($request, $web, $pageBlock, $webStorageService, $storageService);
            $this->persist($pageBlock);
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
    }

    #[Route('/share/{id}', name: 'share', defaults: ['id' => null])]
    #[Security(["is_granted('ROLE_STIS_MAPPING_PROJECT_R')"])]
    public function share(Request $request, WebStorageService $webStorageService, StorageService $storageService, PageBlock $pageBlock = null) {
        $form = $this->createForm(PageBlockType::class, $pageBlock, ['sync_by_id' => false, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $this->uploadImage($request, $web, $pageBlock, $webStorageService, $storageService);
            $pageBlock->setIsShared(true);
            $this->persist($pageBlock);
            return $this->jsonResponseSimple(['blocks' => $web->getPageBlocks(), 'block' => $pageBlock], 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function update(PageBlock $pageBlock, Request $request, WebStorageService $webStorageService, StorageService $storageService) {
        $form = $this->createForm(PageBlockType::class, $pageBlock, ['sync_by_id' => true, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $this->uploadImage($request, $web, $pageBlock, $webStorageService, $storageService);
            $this->flush();
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/delete/{id}", name="delete")
     */
    public function delete(PageBlock $pageBlock, EntityManagerInterface $entityManager) {
        $web = $pageBlock->getWeb();
        if (!$web) {
            throw new CustomErrorMessageException('Není šablona');
        }
        $this->denyAccessUnlessGranted('page_builder_voter', $pageBlock);
        $this->removeEntity($pageBlock);
        return $this->jsonResponseSimple($web->getPageBlocks(), 200);
    }

    /**
     * @Route("/category-list", name="category_list")
     */
    public function categoryList(EntityManagerInterface $entityManager) {
        $category = $entityManager->getRepository(PageBlockTemplateCategory::class)->findAll();
        return $this->jsonResponseSimple($category, 201);
    }

    private function uploadImage(Request $request,Web $web, PageBlock $pageBlock, WebStorageService $webStorageService, StorageService $storageService)
    {
        $image = $request->files->get('image');
        if ($image) {
            if ($pageBlock->getImagePath()) {
                $storageService->removePublic($pageBlock->getImagePath());
            }
            $path = $storageService->upload($webStorageService->getWebUserServerPath($web), Helper::randomString(), $image);
            $pageBlock->setImagePath($path);
        } else {
            /** @var UploadedFile $image */
            $image = $request->files->get('imageBase64');
            $path = $webStorageService->getWebUserServerPath($web).'/'.Helper::randomString();
            ImageHelper::base64_to_jpeg_file($image->getContent(), $path);
            if ($pageBlock->getImagePath()) {
                $storageService->remove($path);
            }
            $pageBlock->setImagePath(StorageService::getPublicPath($path));
        }
    }
}