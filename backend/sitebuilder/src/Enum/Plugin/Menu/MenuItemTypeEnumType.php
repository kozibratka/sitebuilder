<?php

namespace App\Enum\Plugin\Menu;

use App\Enum\AbstractEnumType;

enum MenuItemTypeEnum: string
{
    case Block = 'Block';
    case Page = 'Page';
}

class MenuItemTypeEnumType extends AbstractEnumType
{
    protected $name = 'menu_item_type_enum';

    protected $enum = MenuItemTypeEnum::class;
}