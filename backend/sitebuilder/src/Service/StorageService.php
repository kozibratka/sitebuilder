<?php

namespace App\Service;

use App\Entity\User;
use App\Helper\Helper;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Security\Core\User\UserInterface;

class StorageService
{
    private $filesystem;
    private Finder $finder;

    public function __construct(private ParameterBagInterface $parameterBag)
    {
        $this->filesystem = new Filesystem();
        $this->finder = new Finder();
    }

    public function createStorageForNewUser(User $user) {
        $newUserRootPath = $this->getUserRootStorage($user);
        $this->filesystem->mkdir($newUserRootPath);
    }

    public function getUserDirectoryTree(UserInterface $user) {
        $userRoot = $this->getUserRootStorage($user);
        $directories = $this->finder->directories()->in($userRoot);
        return $this->createDirectoryTree($directories);
    }

    public function getUserDirectoryContent($path, UserInterface $user) {
        $this->finder->depth('== 0');
        $finder = $this->finder->in($this->getPathInUserRoot($path, $user));
        $files = [];
        foreach ($finder as $file) {
            $fileData['type'] = $file->getType();
            $fileData['name'] = $file->getFilename();
            $fileData['size'] = Helper::getSize($file->getSize());
            $files[] = $fileData;
        }
        return $files;
    }

    private function getPathInUserRoot(string $path, UserInterface $user) {
        $rootPath = $resultPath = $this->getUserRootStorage($user);
        $fullDesiredPath = $this->getUserRootStorage($user).'/'.$path;
        if(str_starts_with(realpath($fullDesiredPath), realpath($rootPath))) {
            $resultPath = $fullDesiredPath;
        }

        return $resultPath;
    }

    private function createDirectoryTree(Finder $finder) {
        $tree = [];
        $treeGeneratorCallback = function($path, array &$actualArray, array $fullPath = []) use(&$treeGeneratorCallback) {
            $expodedPath = explode('/', $path);
            $firstDirName = array_shift($expodedPath);
            $fullDirPath = array_merge($fullPath, [$firstDirName]);

            foreach ($actualArray as &$array) {
                if($array['name'] === $firstDirName) {
                    $arrayWithSameName = &$array;
                    break;
                }
            }
            if(!isset($arrayWithSameName)) {
                $newArray = array('name' => $firstDirName, 'children' => [], 'fullPath' => implode('/', $fullDirPath));
                $actualArray[] = &$newArray;
                $arrayWithSameName = &$newArray;
            }
            if(count($expodedPath)) {
                $treeGeneratorCallback(implode('/', $expodedPath), $arrayWithSameName['children'], $fullDirPath);
            }
        };
        foreach ($finder as $path) {
            $treeGeneratorCallback($path->getRelativePathname(), $tree);
        }
        $tree = [[
            'name' => 'Files',
            'children' => $tree,
            'fullPath' => ''
            ]
        ];
        return $tree;
    }

    private function getUserRootStorage(UserInterface $user) {
        $rootPath =  $_ENV['FILE_STORAGE_PATH'] ?? null ?: $this->parameterBag->get('kernel.project_dir').'/var/';
        return $rootPath.$_ENV['USER_STORAGE_PATH_VAR'].$user->getId();
    }
}
