<?php

namespace App\Entity\Plugin\Delimiter;

use App\Entity\Plugin\BasePlugin;
use App\Entity\Util\Enum\Plugin\DelimiterTypeEnum;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity]
#[ORM\Table(name: 'plugin_delimiter')]
class PluginDelimiter extends BasePlugin
{
    #[ORM\Column(type: 'delimiter_type_enum')]
    #[Serializer\Type("enum<'DelimiterTypeEnum', 'value'>")]
    private DelimiterTypeEnum $type;

    #[ORM\Column(type: 'string', nullable: true)]
    private ?string $color = null;

    public function getType(): DelimiterTypeEnum
    {
        return $this->type;
    }

    public function setType(DelimiterTypeEnum $type): void
    {
        $this->type = $type;
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