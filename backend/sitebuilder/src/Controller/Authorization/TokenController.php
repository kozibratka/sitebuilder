<?php


namespace App\Controller\Authorization;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/token", name="token_", options={"expose"=true})
 */
class TokenController extends AbstractController
{
    /**
     * @Route("/create", name="create")
     */
    public function createToken(Request $request) {

    }
}
