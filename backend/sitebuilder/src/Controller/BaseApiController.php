<?php

namespace App\Controller;

use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\HttpFoundation\Response;

class BaseApiController extends AbstractController
{
    protected $serializer;
    protected $requestStack;

    public function __construct(SerializerInterface $serializer, RequestStack $requestStack) {
        $this->serializer = $serializer;
        $this->requestStack = $requestStack;
    }

    public function jsonResponseSimple($data = [], $statusCode = 200, $isInvalidForm = false, string|array $group = null) {
        $onlyValidForm = $this->requestStack->getCurrentRequest()->headers->get('validform');
        $context = SerializationContext::create();
        if ($group) {
            $context->setGroups($group);
        }
//        $context->enableMaxDepthChecks();
//        $context->setGroups($group);
        $serialized = $this->serializer->serialize((!$onlyValidForm || $isInvalidForm) ? $data : [], 'json', $context);

        return JsonResponse::fromJsonString($serialized, $statusCode);
    }

    public function errorJsonResponse($message, $statusCode = 400) {
        return new JsonResponse($message, $statusCode);
    }

    public function persist($entity) {
        $onlyValidForm = $this->requestStack->getCurrentRequest()->headers->get('validform');
        if($onlyValidForm){
            return;
        }
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($entity);
        $entityManager->flush();
    }

    public function flush() {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->flush();
    }

    public function removeEntity($entity)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($entity);
        $entityManager->flush();
    }

    public function invalidFormResponse(FormInterface $form)
    {
        $jsonResponse = $this->jsonResponseSimple($this->getErrorsFromForm($form), 200, true);
        $jsonResponse->headers->set('Content-Type', 'application/invalid-form+json');
        $jsonResponse->setStatusCode(400);
        return $jsonResponse;
    }

    public function responseCsv(array $data, $useKeysForHeaderRow = true, $fieName = 'output')
    {
        if ($useKeysForHeaderRow) {
            array_unshift($data, array_keys(reset($data)));
        }

        $file = fopen('php://memory', 'r+');
        foreach ($data as $row) {
            fputcsv($file, $row);
        }
        rewind($file);
        $csvContent = stream_get_contents($file);
        fclose($file);
        $response = new Response($csvContent);
        $response->headers->set('Content-Type', 'text/csv');
        $response->headers->set('Content-Disposition', 'attachment;filename="'.$fieName.'.csv"');
        return $response;
    }

    protected function getErrorsFromForm(FormInterface $form)
    {
        $errors = array();
        foreach ($form->getErrors() as $error) {
            $errors[] = $error->getMessage();
        }
        foreach ($form->all() as $childForm) {
            if ($childForm instanceof FormInterface) {
                if ($childErrors = $this->getErrorsFromForm($childForm)) {
                    $errors[$childForm->getName()] = $childErrors;
                }
            }
        }
        return $errors;
    }
}
