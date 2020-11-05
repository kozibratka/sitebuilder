<?php

namespace App\Controller;

use JMS\Serializer\SerializerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;

class BaseApiController extends AbstractController
{
    protected $serializer;

    public function __construct(SerializerInterface $serializer) {
        $this->serializer = $serializer;
    }

    public function jsonResponseSimple($data, $statusCode = 200) {
        $serialized = $this->serializer->serialize(['result' => $data], 'json');

        return JsonResponse::fromJsonString($serialized, $statusCode);
    }
}
