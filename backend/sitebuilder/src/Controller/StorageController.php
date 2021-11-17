<?php


namespace App\Controller;

use App\Service\StorageService;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("storage", name="storage_")
 */
class StorageController extends BaseApiController
{
    /**
     * @Route("/user-tree", name="user_tree", methods={"GET"})
     */
    public function readUserTreeDirectory(StorageService $storageService) {
        $userRoot = $storageService->getUserDirectoryTree($this->getUser());
        return $this->jsonResponseSimple($userRoot, 200);
    }
}
