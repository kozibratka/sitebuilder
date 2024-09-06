<?php

namespace App\Service\JMS;

use JMS\Serializer\Context;
use JMS\Serializer\GraphNavigatorInterface;
use JMS\Serializer\Handler\SubscribingHandlerInterface;
use JMS\Serializer\JsonDeserializationVisitor;
use JMS\Serializer\JsonSerializationVisitor;

final class EnumHandler implements SubscribingHandlerInterface
{
    public static function getSubscribingMethods(): array
    {
        return [
            [
                'direction' => GraphNavigatorInterface::DIRECTION_SERIALIZATION,
                'format' => 'json',
                'type' => 'enum',
                'method' => 'serializeEnumToJson',
            ],
            [
                'direction' => GraphNavigatorInterface::DIRECTION_DESERIALIZATION,
                'format' => 'json',
                'type' => 'enum',
                'method' => 'deserializeEnumFromJson',
            ],
        ];
    }

    public function serializeEnumToJson(JsonSerializationVisitor $visitor, \BackedEnum $data, array $type, Context $context): string|int
    {
        return $data->value;
    }

    /**
     * @template T
     *
     * @param array{params: array<array-key, array{name: class-string<T>}>} $type
     *
     * @return \BackedEnum|T
     */
    public function deserializeEnumFromJson(JsonDeserializationVisitor $visitor, mixed $data, array $type, Context $context)
    {
        /** @var ?class-string<T> $type */
        $type = $type['params'][0]['name'] ?? null;
        if (null === $type || !is_a($type, \BackedEnum::class, true)) {
            throw new \LogicException();
        }

        return $type::from($data);
    }
}