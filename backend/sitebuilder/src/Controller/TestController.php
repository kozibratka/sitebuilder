<?php


namespace App\Controller;

use App\Form\SiteBuilder\PaletteGridItem;
use App\Form\SiteBuilder\Plugin\TextPluginType;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("test", name="test_")
 */
class TestController extends BaseApiController
{
    /**
     * @Route("/create-text-plugin", name="create_text_plugin", methods={"POST"})
     */
    public function createTextPlugin(Request $request)
    {
        $form = $this->createForm(TextPluginType::class);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            $textPlugin = $form->getData();
            $this->getDoctrine()->getManager()->persist($textPlugin);
            $this->getDoctrine()->getManager()->flush();
            return $this->jsonResponseSimple($textPlugin, 201);
        }
        return $this->jsonResponseSimple($this->getErrorsFromForm($form), 200);
    }

    /**
     * @Route("/create-gridstack-item", name="create_gridstack_item", methods={"POST"})
     */
    public function createGridstackItem(Request $request)
    {
        $form = $this->createForm(PaletteGridItem::class);
        $form->submit($request->request->all(), false);
        if($form->isValid()) {
            $data = $form->getData();
            $this->getDoctrine()->getManager()->persist($data);
            $this->getDoctrine()->getManager()->flush();
            return $this->jsonResponseSimple($data, 201);
        }
        return $this->jsonResponseSimple($this->getErrorsFromForm($form), 200);
    }
}
