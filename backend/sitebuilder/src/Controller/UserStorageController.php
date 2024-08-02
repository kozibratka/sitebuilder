<?php


namespace App\Controller;

use App\Service\Storage\UserStorageService;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
    public function readDirectoryTree(UserStorageService $storageService) {
        $userRoot = $storageService->getUserDirectoryTree($this->getUser());
        return $this->jsonResponseSimple($userRoot, 200);
    }

    /**
     * @Route("/directory-content", name="directory_content", methods={"POST"})
     */
    public function readDirectoryContent(Request $request, UserStorageService $storageService) {
        $path = $request->request->get('path');
        $content = $storageService->getUserDirectoryContent($path, $this->getUser());
        return $this->jsonResponseSimple($content, 200);
    }

    /**
     * @Route("/search", name="directory_search", methods={"POST"})
     */
    public function search(Request $request, UserStorageService $storageService) {
        $term = $request->request->get('term');
        $path = $request->request->get('path');
        $content = $storageService->getUserDirectoryContent($path, $this->getUser(), $term);
        return $this->jsonResponseSimple($content, 200);
    }

    /**
     * @Route("/directory-create", name="directory_create", methods={"POST"})
     */
    public function createDirectory(Request $request, UserStorageService $storageService) {
        $path = $request->request->get('path');
        $name = $request->request->get('name');
        try {
            $storageService->createDirectory($this->getUser(), $path, $name);
        } catch (\Exception $e) {
            return $this->errorJsonResponse($e->getMessage());
        }
        return $this->jsonResponseSimple();
    }

    /**
     * @Route("/upload-files", name="upload_files", methods={"POST"})
     */
    public function uploadFiles(Request $request, UserStorageService $storageService) {
        $path = $request->request->get('path');
        /** @var UploadedFile[] $files */
        $files = $request->files;
        $resultPath = [];
        foreach($files as $file) {
            $resultPath[] = $storageService->uploadFile($file, $path, $this->getUser());
        }

        return $this->jsonResponseSimple($resultPath);
    }

    /**
     * @Route("/remove-files", name="remove_files", methods={"POST"})
     */
    public function removeFiles(Request $request, UserStorageService $storageService) {
        $path = $request->request->get('path');
        $files = $request->request->get('files');
        $storageService->removeFiles($files, $path, $this->getUser());

        return $this->jsonResponseSimple();
    }


    /**
     * @Route("/size", name="size", methods={"GET"})
     */
    public function size(Request $request, UserStorageService $storageService) {
        $size = $storageService->getSize($this->getUser());

        return $this->jsonResponseSimple($size);
    }
}
