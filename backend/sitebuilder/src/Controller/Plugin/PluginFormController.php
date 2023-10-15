<?php


namespace App\Controller\Plugin;

use App\Controller\BaseApiController;
use App\Entity\SiteBuilder\Plugin\Form\FormData;
use App\Entity\SiteBuilder\Plugin\Form\PluginForm;
use Doctrine\ORM\EntityManagerInterface;
use Nzo\UrlEncryptorBundle\Encryptor\Encryptor;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("plugin-form", name="plugin_form_", options={"expose"=true})
 */
class PluginFormController extends BaseApiController
{
    /**
     * @Route("/save-data/{hash}", name="save_data")
     */
    public function saveData(Encryptor $encryptor, EntityManagerInterface $entityManager, Request $request, ?string $hash = null) {
        if (!$hash) {
            return new JsonResponse();
        }
        if ($id = $encryptor->decrypt($hash)) {
            $pluginForm = $entityManager->getRepository(PluginForm::class)->find($id);
            if (!$pluginForm) {
                return new JsonResponse();
            }
            $newFormData = new FormData();
            $newFormData->setData($request->get('formData'));
            $pluginForm->addFormData($newFormData);
            $entityManager->flush();
        }
        return new JsonResponse();
    }
}
