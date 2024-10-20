<?php

namespace App\Entity\Util\Enum\Plugin;

use App\Entity\Util\Enum\AbstractEnumType;

enum DelimiterTypeEnum: string
{
    case V1 = 'v1';
    case V2 = 'v2';
    case V3 = 'v3';
    case V4 = 'v4';
    case V5 = 'v5';
    case V6 = 'v6';
    case V7 = 'v7';
    case V8 = 'v8';
}

class DelimiterTypeEnumType extends AbstractEnumType
{
    protected $name = 'delimiter_type_enum';

    protected $enum = DelimiterTypeEnum::class;
}
