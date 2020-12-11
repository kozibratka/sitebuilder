<?php


namespace App\Controller;


use App\Entity\PageBuilder\Page;
use App\Form\PageBuilder\PageType;
use JMS\Serializer\SerializerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page", name="page_")
 */
class PageBuilderController extends BaseApiController
{
    /**
     * @Route("/list", name="list")
     */
    public function list(SerializerInterface $serializer)
    {
        $user = $this->getUser();
        $pages = $this->getDoctrine()->getRepository(Page::class)->findBy(['user' => $user]);

        return JsonResponse::fromJsonString($serializer->serialize($pages, 'json'));
    }

    /**
     * @Route("/create", name="create")
     */
    public function create(Request $request)
    {
        $form = $this->createForm(PageType::class);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            $page = $form->getData();
            $this->persist($page);
            return $this->jsonResponseSimple($page, 201);
        }

        return $this->jsonResponseSimple($this->getErrorsFromForm($form), 200);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Page $page)
    {
        $form = $this->createForm(PageType::class, $page);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            $page = $form->getData();
            $this->persist($page);
            return $this->jsonResponseSimple($page, 201);
        }

        return $this->jsonResponseSimple($this->getErrorsFromForm($form), 200);
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Page $page)
    {
        $this->denyAccessUnlessGranted('page_builder_with_children_voter',$page);
        $this->removeEntity($page);
        return new JsonResponse();
    }
}
