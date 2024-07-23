<?php

namespace App\Enum;

use Doctrine\DBAL\Platforms\AbstractPlatform;
use Doctrine\DBAL\Types\Type;

abstract class AbstractEnumType extends Type
{
    protected $name;
    protected $values = array();

    protected $enum;


    public function getSQLDeclaration(array $column, AbstractPlatform $platform)
    {
        if (!$this->values && $this->enum) {
            $this->values = array_column($this->enum::cases(), 'value');
        }

        $values = array_map(function($val) { return "'".$val."'"; }, $this->values);

        return "ENUM(".implode(", ", $values).")";
    }

    public function convertToPHPValue($value, AbstractPlatform $platform)
    {
        return $this->enum::from($value);
    }

    public function convertToDatabaseValue($value, AbstractPlatform $platform)
    {
        if (!$this->values && $this->enum) {
            $this->values = array_column($this->enum::cases(), 'value');
        }
        if (!is_string($value)) {
            $value = $value->value;
        }
        if (!in_array($value, $this->values)) {
            throw new \InvalidArgumentException("Invalid '".$this->name."' value.");
        }

        return $value;
    }

    public function getName()
    {
        return $this->name;
    }

    public function requiresSQLCommentHint(AbstractPlatform $platform)
    {
        return true;
    }
}
