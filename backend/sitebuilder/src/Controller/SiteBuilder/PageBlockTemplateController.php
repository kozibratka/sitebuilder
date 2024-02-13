<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockTemplateCategory;
use App\Entity\SiteBuilder\Web;
use App\Form\SiteBuilder\PageBlockType;
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
     * @Route("/create/{id}", name="create")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function create(Request $request, Web $web) {
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
     * @Route("/category-list", name="category_list")
     * @Security("is_granted('ROLE_ADMIN')")
     */
    public function categoryList(EntityManagerInterface $entityManager) {
        $category = $entityManager->getRepository(PageBlockTemplateCategory::class)->findAll();
        return $this->jsonResponseSimple($category, 201);
    }
}