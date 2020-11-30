<?php

namespace App\Helper;

use ReflectionClass;

class ClassInfoHelper
{
    public static function getClassNameFromNamespace($className): string
    {
        return (new ReflectionClass($className))->getShortName();
    }
}
