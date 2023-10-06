<?php


namespace App\Form\Transformer;


use Symfony\Component\Form\DataTransformerInterface;

class JsonTransformer implements DataTransformerInterface
{
    public function reverseTransform($value): mixed
    {
        if (empty($value)) {
            return [];
        }

        return json_decode($value);
    }
    public function transform($value): mixed
    {
        if (empty($value)) {
            return json_encode([]);
        }

        return json_encode($value);
    }
}
