<?php

namespace App\Service;

use App\Entity\User;
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

    public function getUserRootStorage(UserInterface $user) {
        $rootPath =  $_ENV['FILE_STORAGE_PATH'] ?? null ?: $this->parameterBag->get('kernel.project_dir').'/var/';
        return $rootPath.$_ENV['USER_STORAGE_PATH_VAR'].$user->getId();
    }

    public function getUserDirectoryTree(UserInterface $user) {
        $userRoot = $this->getUserRootStorage($user);
        $directories = $this->finder->directories()->in($userRoot);
        return $this->createDirectoryTree($directories);
    }

    public function createDirectoryTree(Finder $finder) {
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
        return $tree;
    }
}