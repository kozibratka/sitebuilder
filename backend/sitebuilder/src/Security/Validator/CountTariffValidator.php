<?php

namespace App\Security\Validator;

use App\Entity\Tariff;
use App\Entity\User;
use App\Exception\CustomErrorMessageException;
use Symfony\Component\Form\Exception\UnexpectedTypeException;
use Symfony\Component\PropertyAccess\PropertyAccess;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\Constraints\CountValidator;
use Symfony\Component\Validator\ConstraintViolationInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class CountTariffValidator extends CountValidator
{
    private ?Tariff $tariff = null;
    public function __construct(
        private Security $security,
        private TranslatorInterface $translator
    )
    {}

    public function validate($value, Constraint $constraint)
    {
        if (!$constraint instanceof CountTariff) {
            throw new UnexpectedTypeException($constraint, CountTariff::class);
        }

        if (!$this->tariff) {
            /** @var User $user */
            $user = $this->security->getUser();
            $this->tariff = $user->getTariff();
        }
        if($this->tariff) {
            $propertyAccessor = PropertyAccess::createPropertyAccessor();
            $type = $constraint->type ?? $this->context->getPropertyName();
            $max = $propertyAccessor->getValue($this->tariff, $type);
            $constraint->max = $max;

        }
        parent::validate($value, $constraint);
        /** @var ConstraintViolationInterface $invalidate */
        $invalidate = $this->context->getViolations()[0] ?? null;
        if ($invalidate) {
            $transProperty = match ($type) {
                'pages' => 'of pages',
                'domains' => 'of domains',
                'plugins' => 'of plugins',
                'blocks' => 'of blocks on page',
                'rows' => 'of rows on block',
                'cells' => 'of cells in row',
                'cellItems' => 'of cell items in cell',
                'webs' => 'of webs',
                'pluginItems' => 'of plugin items',
                'pluginFormData' => 'of form data',
                default => ''
            };


            $message = $this->translator->trans('Rate Limit Exceeded Count').' '.$this->translator->trans($transProperty);
            throw new CustomErrorMessageException($message);
        }

    }


}