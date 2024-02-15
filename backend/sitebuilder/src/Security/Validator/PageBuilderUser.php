<?php


namespace App\Security\Validator;

use Symfony\Component\Validator\Constraint;

#[\Attribute]
class PageBuilderUser extends Constraint
{
    public string $message = 'Illegal user for "{{ string }}"';

    public function validatedBy()
    {
        return static::class.'Validator';
    }
}
