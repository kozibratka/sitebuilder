<?php


namespace App\Controller\Plugin;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Plugin\ArticlePlugin;
use App\Entity\Web\Web;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("article", name="article_", options={"expose"=true})
 */
class ArticleController extends BaseApiController
{
    /**
     * @Route("/list/{id}", name="list")
     */
    public function list(Web $web)
    {
        $this->denyAccessUnlessGranted('page_builder_voter',$web);
        $pages = $this->getDoctrine()->getRepository(ArticlePlugin::class)->findBy(['web' => $web]);
        return $this->jsonResponseSimple($pages);
    }
}
