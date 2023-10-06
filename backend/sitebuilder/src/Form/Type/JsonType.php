<?php


namespace App\Form\Type;

use App\Form\Transformer\JsonTransformer;
use Doctrine\DBAL\Types\TextType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class JsonType extends AbstractType
{
    public function getParent(): string
    {
        return TextType::class;
    }
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder->addModelTransformer(new JsonTransformer());
    }
}
