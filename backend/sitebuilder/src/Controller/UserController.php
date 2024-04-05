<?php


namespace App\Controller;

use App\Entity\SiteBuilder\Web;
use App\Entity\User;
use App\Form\UserRegistrationType;
use App\Form\UserType;
use App\Service\Storage\UserStorageService;
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
    public function registration(Request $request, UserStorageService $storageService) {
        $form = $this->createForm(UserRegistrationType::class);
        $form->submit($request->request->all());
        if($form->isValid()) {
            /** @var User $user */
            $user = $form->getData();
            $newWeb = (new Web())->setName('Můj nový web');
            $user->addWeb($newWeb);

            $this->persist($user);
            $storageService->createStorageForNewUser($user);

            return $this->jsonResponseSimple($user, 201);
        }
        return $this->invalidFormResponse($form);
    }

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
