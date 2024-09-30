<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\Plugin\BasePlugin;
use App\Entity\Web\Web;
use App\Service\Plugin\PluginServiceService;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("plugin", name="plugin_")
 */
class PluginController extends BaseApiController
{
    /**
     * @Route("/list-global/{id}", name="global_list")
     */
    public function listGlobal(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $globalPlugins = $this->getDoctrine()->getRepository(BasePlugin::class)->findBy(['web' => $web]);
        return $this->jsonResponseSimple($globalPlugins);
    }

    /**
     * @Route("/list-by-identifier/{id}/{identifier}", name="list_by_identifier")
     */
    public function listByIdentifier(Web $web, $identifier, PluginServiceService $pluginService)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $entityClass = $pluginService->getPluginServiceByIdentifier($identifier)->getEntityClass();
        $plugins = $this->getDoctrine()->getRepository($entityClass)->findBy(['web' => $web]);
        return $this->jsonResponseSimple($plugins);
    }

    /**
     * @Route("/create/{id}/{identifier}", name="create")
     */
    public function create(Request $request, Web $web, $identifier, PluginServiceService $pluginServiceService)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $pluginService = $pluginServiceService->getPluginServiceByIdentifier($identifier);
        $form = $this->createForm($pluginService->getFormClass(), null, ['validation_groups' => ['Default', 'Name']]);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            /** @var BasePlugin $plugin */
            $plugin = $form->getData();
            $plugin->setWeb($web);
            $this->persist($plugin);
            return $this->jsonResponseSimple($plugin, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/update/{id}", name="update")
     */
    public function update(Request $request, BasePlugin $basePlugin, PluginServiceService $pluginServiceService)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$basePlugin);
        $pluginService = $pluginServiceService->getPluginServiceByIdentifier($basePlugin->getIdentifier());
        $form = $this->createForm($pluginService->getFormClass(), $basePlugin);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            $this->flush();
            return $this->jsonResponseSimple($basePlugin, 201);
        }
        return $this->invalidFormResponse($form);
    }

    /**
     * @Route("/remove/{id}", name="remove")
     */
    public function remove(Request $request, BasePlugin $basePlugin, ManagerRegistry $doctrine)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$basePlugin);
        $em = $doctrine->getManager();
        $em->remove($basePlugin);
        $em->flush();
        return $this->jsonResponseSimple($basePlugin, 201);

    }
}
