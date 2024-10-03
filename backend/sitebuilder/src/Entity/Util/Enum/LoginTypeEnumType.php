<?php
namespace App\Entity\Util\Enum;

enum LoginTypeEnum: string {
    case Form = 'Form';
    case Google = 'Google';
    case Facebook = 'Facebook';
}

class LoginTypeEnumType extends AbstractEnumType
{
    protected $name = 'login_type_enum';

    protected $enum = LoginTypeEnum::class;
}