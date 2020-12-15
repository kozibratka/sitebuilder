<?php

namespace App\Controller;

use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Form\FormInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RequestStack;

class BaseApiController extends AbstractController
{
    protected $serializer;
    protected $requestStack;

    public function __construct(SerializerInterface $serializer, RequestStack $requestStack) {
        $this->serializer = $serializer;
        $this->requestStack = $requestStack;
    }

    public function jsonResponseSimple($data, $statusCode = 200) {
        $serialized = $this->serializer->serialize($data, 'json');

        return JsonResponse::fromJsonString($serialized, $statusCode);
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

    public function removeEntity($entity)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->remove($entity);
        $entityManager->flush();
    }

    public function invalidFormResponse(FormInterface $form)
    {
        $jsonResponse = $this->jsonResponseSimple($form);
        $jsonResponse->headers->set('Content-Type', 'application/invalid-form+json');
        $jsonResponse->setStatusCode(400);
        return $jsonResponse;
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
