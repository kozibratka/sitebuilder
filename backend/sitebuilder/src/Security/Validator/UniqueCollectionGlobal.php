<?php

namespace App\Security\Validator;
use Symfony\Component\Validator\Constraint;

#[\Attribute(\Attribute::TARGET_CLASS | \Attribute::IS_REPEATABLE)]
class UniqueCollectionGlobal extends Constraint
{
    public string $message = 'Duplicate value';

    public function __construct(
        public string $fieldName,
        public string $parentName,
        public ?string $errorPath = '',
        ?array $groups = null,
        mixed $payload = null,
    ) {
        parent::__construct([], $groups, $payload);
    }

    public function getTargets()
    {
        return self::CLASS_CONSTRAINT;
    }
}