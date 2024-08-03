<?php

namespace App\Security\Validator;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\PropertyAccess\PropertyAccessorInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class UniqueCollectionGlobalValidator extends ConstraintValidator
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private PropertyAccessorInterface $propertyAccessor
    ) {
    }

    public function validate($value, Constraint $constraint): void
    {
        if (!$constraint instanceof UniqueCollectionGlobal) {
            throw new UnexpectedTypeException($constraint, UniqueCollectionGlobal::class);
        }
        $fieldName = $constraint->fieldName;
        $classNameContext = (new \ReflectionClass($value))->getName();
        $fieldValue = $this->propertyAccessor->getValue($value, $fieldName);
        $parent = $this->propertyAccessor->getValue($value, $constraint->parentName);
        $result = $this->entityManager->getRepository($classNameContext)->createQueryBuilder('qb')
            ->join('qb.'.$constraint->parentName, 'parent')
            ->andWhere('parent.id != :id')
            ->setParameter('id', $parent->getId())
            ->andWhere('qb.'.$fieldName.' = :fieldValue')
            ->setParameter('fieldValue', $fieldValue)
            ->setMaxResults(1)
            ->getQuery()->getOneOrNullResult();
        ;
        if ($result) {
            $this->context->buildViolation($constraint->message)
                ->atPath($constraint->errorPath)
                ->setParameter('{{ string }}', $value)
                ->addViolation();
        }
    }
    public function validatedBy()
    {
        return static::class.'Validator';
    }
}