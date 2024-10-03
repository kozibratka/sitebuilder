<?php

namespace App\Helper;

use ReflectionClass;

class ClassInfoHelper
{
    public static function getClassNameFromNamespace($className): string
    {
        return (new ReflectionClass($className))->getShortName();
    }

    public static function getPropertyForAttribute($object, $attrClass): ?\ReflectionProperty
    {
        $reflectionClass = new ReflectionClass($object);
        foreach ($reflectionClass->getProperties() as $reflectionProperty) {
            $attributes = $reflectionProperty->getAttributes($attrClass);
            foreach ($attributes as $attribute) {
                if ($attribute->newInstance() instanceof $attrClass) {
                    return $reflectionProperty;
                }
            }
        }

        return null;
    }
}
