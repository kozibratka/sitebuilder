<?php


namespace App\Security\Validator;


use App\Security\Voter\PageBuilder\PageBuilderVoter;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class PageBuilderUserValidator extends ConstraintValidator
{
    public function __construct(public PageBuilderVoter $pageBuilderVoter, public Security $security)
    {
    }

    public function validate(mixed $value, Constraint $constraint)
    {
        if (!$constraint instanceof PageBuilderUser) {
            throw new UnexpectedTypeException($constraint, PageBuilderUser::class);
        }
        if (!$value) {
            return;
        }

        if ($this->pageBuilderVoter->check($value, $this->security->getUser())) {
            return;
        }

        $this->context->buildViolation($constraint->message)
            ->setParameter('{{ string }}', get_class($value))
            ->addViolation();
    }
}
