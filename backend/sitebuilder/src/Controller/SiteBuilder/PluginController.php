<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
use App\Service\Plugin\PluginService;
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
    public function listByIdentifier(Web $web, $identifier, PluginService $pluginService)
    {
        $entityClass = $pluginService->getPluginServiceByIdentifier($identifier)->getEntityClass();
        $plugins = $this->getDoctrine()->getRepository($entityClass)->findBy(['web' => $web]);
        return $this->jsonResponseSimple($plugins);
    }
}
