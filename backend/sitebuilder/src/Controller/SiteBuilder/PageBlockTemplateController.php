<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Form\SiteBuilder\PageBlockTemplateType;
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
        $form = $this->createForm(PageBlockTemplateType::class);
        $data = ['block' => json_decode($request->request->all()['block'], true)];
        $form->submit($data);
        if($form->isSubmitted() && $form->isValid()) {
            /** @var PageBlock $pageBlock */
            $pageBlock = $form->get('block')->getData();
            $web = $pageBlock->getWeb();
            $image = $request->files->get('image');
            $path = $webStorageService->uploadBlockImage($web, $image, Helper::randomString());
            $pageBlock->setImagePath($path);
            $this->persist($pageBlock);
            return $this->jsonResponseSimple($web->getPageBlocks(), 201);
        }
        return $this->invalidFormResponse($form);
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