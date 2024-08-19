<?php

namespace App\Security\Validator;

use Symfony\Component\Validator\Constraints\Count;
#[\Attribute(\Attribute::TARGET_PROPERTY | \Attribute::TARGET_METHOD | \Attribute::IS_REPEATABLE)]
class CountTariff extends Count
{

    public function __construct(
        public $type = null,
        $exactly = null,
        int $min = null,
        int $max = 0,
        int $divisibleBy = null,
        string $exactMessage = null,
        string $minMessage = null,
        string $maxMessage = null,
        string $divisibleByMessage = null,
        array $groups = null,
        $payload = null,
        array $options = []
    )
    {
        parent::__construct($exactly, $min, $max,$divisibleBy,$exactMessage,$minMessage,$maxMessage,$divisibleByMessage,$groups,$payload,$options);
    }
}