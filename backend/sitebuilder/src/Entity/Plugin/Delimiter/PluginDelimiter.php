<?php

namespace App\Entity\Plugin\Delimiter;

use App\Entity\Plugin\BasePlugin;
use App\Entity\Util\Enum\Plugin\DelimiterTypeEnum;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_delimiter')]
class PluginDelimiter extends BasePlugin
{
    #[ORM\Column(type: 'delimiter_type_enum')]
    private DelimiterTypeEnum $delimiterType;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $color = null;

    public function getDelimiterType(): DelimiterTypeEnum
    {
        return $this->delimiterType;
    }

    public function setDelimiterType(DelimiterTypeEnum $delimiterType): void
    {
        $this->delimiterType = $delimiterType;
    }

    public function getColor(): ?string
    {
        return $this->color;
    }

    public function setColor(?string $color): void
    {
        $this->color = $color;
    }

    public function setIdentifier()
    {
        $this->identifier = 'delimiter_v1';
    }
}