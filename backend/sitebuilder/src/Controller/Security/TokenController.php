<?php


namespace App\Controller\Security;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/token", name="token_", options={"expose"=true})
 */
class TokenController extends AbstractController
{
    /**
     * @Route("/create", name="create")
     */
    public function createToken() {
        return new JsonResponse(['yes new token']);
    }
}
