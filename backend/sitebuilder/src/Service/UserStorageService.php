<?php

namespace App\Service;

use App\Entity\User;
use App\Helper\Helper;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class UserStorageService
{
    private $filesystem;
    private Finder $finder;

    public function __construct(private ParameterBagInterface $parameterBag, private TranslatorInterface $translator)
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

    public function getUserDirectoryContent($path, UserInterface $user, $term = '') {
        $this->finder->depth('== 0');
        $finder = $this->finder->in($this->getValidUserServerPath($path, $user));
        if ($term) {
            $finder->name("*$term*")->depth('< 99');;
        }
        $files = [];
        foreach ($finder as $file) {
            $fileData['type'] = $file->getType();
            $fileData['name'] = $file->getFilename();
            $fileData['size'] = Helper::getSize($file->getSize());
            $fileData['path'] = $this->getValidUserPath($file->getRealPath(), $user);
            $files[] = $fileData;
        }
        return $files;
    }

    public function createDirectory(UserInterface $user, string $path, string $name) {
        if (!Helper::validFileName($name)) {
            throw new \Exception($this->translator->trans('Invalid directory name'));
        }
        $path = $this->getValidUserServerPath($path, $user);
        $filesystem = new Filesystem();
        $filesystem->mkdir($path.'/'.$name);
    }

    private function getValidUserServerPath(string $path, UserInterface $user) {
        $rootPath = $resultPath = $this->getUserRootStorage($user);
        $fullDesiredPath = $this->getUserRootStorage($user).'/'.trim($path, '/');
        if(str_starts_with(realpath($fullDesiredPath), realpath($rootPath))) {
            $resultPath = $fullDesiredPath;
        }

        return '/'.trim($resultPath, '/');
    }

    private function getValidUserPath(string $path, UserInterface $user) {
        $rootPath = $this->getUserRootStorage($user);
        $pos = strpos($path, $rootPath);
        return trim(substr_replace($path, '', $pos, strlen($rootPath)), '/');
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
