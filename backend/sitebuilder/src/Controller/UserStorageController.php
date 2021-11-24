<?php


namespace App\Controller;

use App\Service\StorageService;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("user-storage", name="user_storage_")
 */
class UserStorageController extends BaseApiController
{
    /**
     * @Route("/directory-tree", name="directory_tree", methods={"GET"})
     */
    public function readDirectoryTree(StorageService $storageService) {
        $userRoot = $storageService->getUserDirectoryTree($this->getUser());
        return $this->jsonResponseSimple($userRoot, 200);
    }

    /**
     * @Route("/directory-content", name="directory_content", methods={"POST"})
     */
    public function readDirectoryContent(Request $request, StorageService $storageService) {
        $path = $request->request->get('path');
        $content = $storageService->getUserDirectoryContent($path, $this->getUser());
        return $this->jsonResponseSimple($content, 200);
    }
}
