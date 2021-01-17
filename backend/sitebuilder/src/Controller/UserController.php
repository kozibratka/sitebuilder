<?php


namespace App\Controller;

use App\Form\UserRegistrationType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("user", name="user_")
 */
class UserController extends BaseApiController
{
    /**
     * @Route("/registration", name="registration", methods={"POST"})
     */
    public function registration(Request $request) {
        $form = $this->createForm(UserRegistrationType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $user = $form->getData();
            $this->persist($user);
            return $this->jsonResponseSimple($user, 201);
        }
        return $this->invalidFormResponse($form);
    }
}
