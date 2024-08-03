<?php

namespace App\Service\Storage;

use _PHPStan_adbc35a1c\Symfony\Component\Finder\Iterator\RecursiveDirectoryIterator;
use App\Constant\Limit;
use App\Entity\User;
use App\Exception\CustomErrorMessageException;
use App\Helper\Helper;
use Symfony\Component\DependencyInjection\ParameterBag\ParameterBagInterface;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Finder\Finder;
use Symfony\Component\Finder\SplFileInfo;
use Symfony\Component\HttpFoundation\File\UploadedFile;
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
        $newUserRootPath = $this->getUserServerRootStorage($user);
        $this->filesystem->mkdir($newUserRootPath);
    }

    public function getUserDirectoryTree(UserInterface $user) {
        $userRoot = $this->getUserServerRootStorage($user);
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
            $fileData['mimeType'] = mime_content_type($file->getRealPath());
            $fileData['size'] = Helper::getSize($file->getSize());
            $fileData['path'] = $this->getPathRelativeToUserData($file->getRealPath(), $user);
            $fileData['publicPath'] = $this->getPublicPathFile($file);
            $fileData['modified'] = (new \DateTime())->setTimestamp(filemtime($file->getRealPath()))->format(\DateTimeInterface::ATOM);
            $files[] = $fileData;
        }
        return $files;
    }

    public function createDirectory(UserInterface $user, string $path, string $name) {
        if (!Helper::validFileName($name)) {
            throw new \Exception($this->translator->trans('Invalid directory name'));
        }
        $deepLevel = count(explode('/', $path));
        if ($deepLevel > Limit::DIR_MAX_DEEP) {
            throw new CustomErrorMessageException('Překročen limit vnořených adresářů');
        }
        $path = $this->getValidUserServerPath($path, $user);
        $this->checkCountFiles($path);
        $filesystem = new Filesystem();
        $filesystem->mkdir($path.'/'.$name);
    }

    public function removeFiles(array $files, string $path, UserInterface $user) {
        $path = $this->getValidUserServerPath($path, $user);
        $filesystem = new Filesystem();
        foreach ($files as $file) {
            $filesystem->remove($path.'/'.$file);
        }
    }

    public function uploadFile(UploadedFile $file, string $path, UserInterface $user) {
        $size = $this->getSize($user);
        $fileSize = UserStorageService::bytesToGigabyte($file->getSize());
        $size += $fileSize;
        if ($size > Limit::DISK) {
            throw new CustomErrorMessageException('Některé soubory se nepodařilo nahrát kvůli překročení limitu místa na disku');
        }
        $realPath = $this->getValidUserServerPath($path, $user);
        if (!$this->filesystem->exists($realPath)) {
            $this->filesystem->mkdir($realPath);
        }
        $this->checkCountFiles($realPath);
        $newFile = $file->move($realPath, $file->getClientOriginalName());
        return $this->getPublicPathFile($newFile->getFileInfo());
    }

    private function getValidUserServerPath(string $path, UserInterface $user) {
        $userDataRootPath = $resultPath = $this->getUserServerRootStorage($user);
        $fullDesiredPath = $userDataRootPath.'/'.trim($path, '/');
        if(str_starts_with($fullDesiredPath, $userDataRootPath)) {
            $resultPath = $fullDesiredPath;
        }
        return '/'.trim($resultPath, '/');
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

    public function getPublicPathFile(SplFileInfo|\SplFileInfo $fileInfo) {
        $fullPathFile = $fileInfo->getRealPath();
        $basePublic = $this->getBasePublicStoragePath();
        $path = str_replace($basePublic, '', $fullPathFile);
        return $path;
    }

    private function getPathRelativeToUserData(string $path, UserInterface $user) {
        $rootPath = $this->getUserServerRootStorage($user);
        $pos = strpos($path, $rootPath);
        return trim(substr_replace($path, '', $pos, strlen($rootPath)), '/');
    }

    public function getUserServerRootStorage(UserInterface $user) {
        $rootPath =  $this->getRootServerStorage($user);
        return $rootPath.'/user_data';
    }

    public function getRootServerStorage(UserInterface $user) {
        $rootPath =  $this->getBasePublicStoragePath().'/storage';
        return $rootPath.'/user/'.$user->getId();
    }

    public function getBasePublicStoragePath() {
        return $this->parameterBag->get('kernel.project_dir').'/public';
    }

    public function getSize(UserInterface $user)
    {
        $path = $this->getUserServerRootStorage($user);
        $bytestotal = 0;
        if($path!==false && $path!='' && file_exists($path)){
            foreach(new \RecursiveIteratorIterator(new RecursiveDirectoryIterator($path, \FilesystemIterator::SKIP_DOTS)) as $object){
                $bytestotal += $object->getSize();
            }
        }
        return self::bytesToGigabyte($bytestotal);
    }

    public function checkCountFiles($path)
    {
        $finder = new Finder();
        if ($finder->files()->in($path)->count() > Limit::COUNT_FILES_IN_DIR) {
            throw new CustomErrorMessageException('Překročen limit počtu souborů v adresáři');
        }
    }

    public static function bytesToGigabyte($bytes) {
        return $bytes/pow(10, 9);
    }
}
