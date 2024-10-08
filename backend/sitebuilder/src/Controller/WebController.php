<?php

namespace App\Controller;

use App\Constant\Limit;
use App\Entity\Page\AbstractPage;
use App\Entity\Page\Page;
use App\Entity\Page\PublicPage;
use App\Entity\User;
use App\Entity\Web\Web;
use App\Exception\CustomErrorMessageException;
use App\Form\Web\WebType;
use App\Helper\Helper;
use App\Service\Storage\StorageService;
use App\Service\Storage\WebStorageService;
use Carbon\Carbon;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


/**
 * @Route("web", name="web_")
 */
class WebController extends BaseApiController
{
    /**
     * @Route("/list-info", name="list_info")
     */
    public function webListInfo()
    {
        $result = [];
        $user = $this->getUser();
        $webs = $this->getDoctrine()->getRepository(Web::class)->findBy(['user' => $user], ['id' => 'desc']);
        foreach ($webs as $web) {
            $result[] = [
                'name' => $web->getName(),
                'createdAt' => Carbon::create($web->getCreatedAt())->toDateTimeString(),
                'pagesCount' => $web->getPages()->filter(fn(AbstractPage $page) => $page instanceof Page)->count(),
                'public' => $web->getPages()->filter(fn(AbstractPage $page) => $page instanceof PublicPage)->count(),
                'domain' => implode(', ', $web->getDomains()->toArray()),
                'id' => $web->getId(),
            ];
        }


        return $this->jsonResponseSimple($result);
    }

    /**
     * @Route("/list", name="list")
     */
    public function list()
    {
        $user = $this->getUser();
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['user' => $user], ['id' => 'desc']);
        return $this->jsonResponseSimple($pages, group: 'base_list');
    }

    /**
     * @Route("/read/{id}", name="read")
     */
    public function read(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $web = $this->getDoctrine()->getRepository(Web::class)->getWebWithPages($web);
        return $this->jsonResponseSimple($web);
    }

    #[Route('/create/{id}', name: 'create', defaults: ['id' => null])]
    public function create(Request $request, ?Web $web = null)
    {
        /** @var User $user */
        $user = $this->getUser();
        if ($user->getWebs()->count() >= $user->getTariff()->getWebs()) {
            throw new CustomErrorMessageException('Překročen limit počtu webů');
        }
        $validationWeb = new Web();
        $validationWeb->setUser($this->getUser());
        $form = $this->createForm(WebType::class, $validationWeb, ['allow_is_template' => $this->isGranted('ROLE_ADMIN')]);
        $form->submit($request->request->all());
        if($form->isValid()) {
            if ($web && !$web->getParent()) {
                $newWeb = clone $web;
                $newWeb->setParent($web);
                $newWeb->setIsTemplate(false);
                $newWeb->setName($form->get('name')->getData());
            } else {
                $newWeb = new Web();
                $newWeb->setName($form->get('name')->getData());
            }

            $this->persist($newWeb);
            return $this->jsonResponseSimple($newWeb, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, Web $web, StorageService $storageService, WebStorageService $webStorageService)
    {
        $this->denyAccessUnlessGranted('page_builder_with_children_voter',$web);
        $form = $this->createForm(WebType::class, $web, ['allow_is_template' => $this->isGranted('ROLE_ADMIN')]);
        $form->submit($request->request->all());
        if($form->isSubmitted() && $form->isValid()) {
            if ($web->getFile()) {
                if ($web->getImagePath()) {
                    $storageService->removePublic($web->getImagePath());
                }
                $web->setImagePath($storageService->upload($webStorageService->getWebUserServerPath($web), Helper::randomString(), $web->getFile()));
            }
            $this->flush();
            return $this->jsonResponseSimple($web, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        if ($web->isTemplate()) {
            throw new CustomErrorMessageException('Nelze smazat web šablony');
        }
        $this->removeEntity($web);
        return new JsonResponse();
    }

    /**
     * @Route("/template-list", name="template_list")
     */
    public function templateList() {
        $pages = $this->getDoctrine()->getRepository(Web::class)->findBy(['isTemplate' => true]);
        return $this->jsonResponseSimple($pages, group: 'base_list');
    }
}
