<?php


namespace App\Controller;

use App\Form\UserType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("user", name="user_")
 */
class UserController extends BaseApiController
{
    /**
     * @Route("/read", name="read", methods={"GET"})
     */
    public function read() {
        $user = $this->getUser();
        return $this->jsonResponseSimple($user, 201, group: 'user');
    }

    /**
     * @Route("/update", name="update", methods={"POST"})
     */
    public function update(Request $request) {
        $user = $this->getUser();
        $form = $this->createForm(UserType::class, $user);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $this->flush();
            return $this->jsonResponseSimple([], 201);
        }

        return $this->invalidFormResponse($form);
    }
}
