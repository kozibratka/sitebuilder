<?php

namespace App\Controller\Security;

use App\Controller\BaseApiController;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/role", name="role_", options={"expose"=true})
 */
class RoleController extends BaseApiController
{
    /**
     * @Route("/check/{roleName}", name="check", methods={"GET"})
     */
    public function checkRole($roleName) {
        $result = $this->isGranted($roleName);

        return $this->jsonResponseSimple($result);
    }
    /**
     * @Route("/list", name="list", methods={"GET"})
     */
    public function listRoles() {
        $result = $this->getUser()->getRoles();

        return $this->jsonResponseSimple($result);
    }
}
