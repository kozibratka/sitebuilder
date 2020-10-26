<?php


namespace App\Controller;


use App\Entity\Page;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("page", name="page_")
 */
class PageController extends AbstractController
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
