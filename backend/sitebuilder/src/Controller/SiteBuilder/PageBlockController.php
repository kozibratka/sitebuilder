<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
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
     * @Security("is_granted('ROLE_USER')")
     */
    #[Route('/share/{id}', name: 'share', defaults: ['id' => null])]
    public function share(Request $request, WebStorageService $webStorageService, PageBlock $pageBlock = null) {
        $form = $this->createForm(PageBlockType::class, $pageBlock, ['sync_by_id' => false, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            /** @var UploadedFile $image */
            $image = $request->files->get('image');
            if ($image) {
                $pageBlock->setFileName(Helper::randomString());
                $pageBlock->setImagePath($webStorageService->getWebUserServerPath($web));
                $pageBlock->file = $image;
            } else {
                /** @var UploadedFile $image */
                $image = $request->files->get('imageBase64');
                $path = $webStorageService->getWebUserServerPath($web).'/'.Helper::randomString();
                ImageHelper::base64_to_jpeg_file($image->getContent(), $path);
                if ($pageBlock->getImagePath()) {
                    (new Filesystem())->remove(StorageService::getFullPath($pageBlock->getImagePath()));
                }
                $pageBlock->setImagePath(StorageService::getPublicPath($path));
            }
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
    public function update(PageBlock $pageBlock, Request $request, WebStorageService $webStorageService) {
        $form = $this->createForm(PageBlockType::class, $pageBlock, ['sync_by_id' => true, 'web' => true]);
        $form->submit(json_decode($request->request->all()['block'], true));
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->getData();
            $web = $pageBlock->getWeb();
            $image = $request->files->get('image');
            if ($image) {
                $pageBlock->setFileName(Helper::randomString());
                $pageBlock->setImagePath($webStorageService->getWebUserServerPath($web));
                $pageBlock->file = $image;
            } else {
                /** @var UploadedFile $image */
                $image = $request->files->get('imageBase64');
                $path = $webStorageService->getWebUserServerPath($web).'/'.Helper::randomString();
                ImageHelper::base64_to_jpeg_file($image->getContent(), $path);
                if ($pageBlock->getImagePath()) {
                    (new Filesystem())->remove(StorageService::getFullPath($pageBlock->getImagePath()));
                }
                $pageBlock->setImagePath(StorageService::getPublicPath($path));
            }
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
}