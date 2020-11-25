<?php


namespace App\Controller;


use App\Entity\PageBuilder\Page;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page", name="page_")
 */
class PageBuilderController extends AbstractController
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
}
