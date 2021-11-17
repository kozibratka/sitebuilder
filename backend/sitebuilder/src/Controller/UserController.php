<?php


namespace App\Controller;

use App\Form\UserRegistrationType;
use App\Service\StorageService;
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
    public function registration(Request $request, StorageService $storageService) {
        $form = $this->createForm(UserRegistrationType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            $user = $form->getData();
            $this->persist($user);
            $storageService->createStorageForNewUser($user);

            return $this->jsonResponseSimple($user, 201);
        }
        return $this->invalidFormResponse($form);
    }
}
