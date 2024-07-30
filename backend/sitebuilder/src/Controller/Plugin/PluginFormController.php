<?php


namespace App\Controller\Plugin;

use App\Controller\BaseApiController;
use App\Entity\Plugin\Form\FormData;
use App\Entity\Plugin\Form\PluginForm;
use Carbon\Carbon;
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
    public function saveData(EntityManagerInterface $entityManager, Request $request, ?string $hash = null) {
        if (!$hash) {
            return new JsonResponse();
        }
        $pluginForm = $entityManager->getRepository(PluginForm::class)->findOneBy(['hashId' => $hash]);
        if (!$pluginForm) {
            return new JsonResponse();
        }
        $newFormData = new FormData();
        $newFormData->setData($request->get('formData'));
        $pluginForm->addFormData($newFormData);
        $entityManager->flush();
        return new JsonResponse();
    }

    /**
     * @Route("/get-data/{hash}", name="get_data")
     */
    public function getData($hash, EntityManagerInterface $entityManager) {
        if (!$hash) {
            return new JsonResponse();
        }
        $pluginForm = $entityManager->getRepository(PluginForm::class)->findOneBy(['hashId' => $hash]);
        if (!$pluginForm) {
            return new JsonResponse();
        }
        $data = $pluginForm->getFormData();
        return $this->jsonResponseSimple($data);
    }

    /**
     * @Route("/get-data-csv/{hash}", name="data_csv")
     */
    public function getDataCsv($hash, EntityManagerInterface $entityManager) {
        if (!$hash) {
            return new JsonResponse();
        }
        $pluginForm = $entityManager->getRepository(PluginForm::class)->findOneBy(['hashId' => $hash]);
        if (!$pluginForm) {
            return new JsonResponse();
        }
        return $this->responseCsv($pluginForm->getFormData()->map(fn(FormData $formData) => ['date' => Carbon::create($formData->getCreatedAt())->toDateTimeString(),...$formData->getData()])->toArray());
    }
}
