<?php


namespace App\Security\Validator;


use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

/**
 * @Annotation
 */
class UniqueEntityWithUser extends UniqueEntity
{
    public function validatedBy()
    {
        return static::class.'Validator';
    }
}
