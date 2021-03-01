<?php

namespace App\Controller\SiteBuilder;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Web;
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
}
