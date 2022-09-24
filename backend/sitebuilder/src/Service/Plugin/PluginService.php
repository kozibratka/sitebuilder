<?php

namespace App\Service\Plugin;
use Traversable;

class PluginService
{
    private array $pluginServices;

    public function __construct(Traversable $pluginServices)
    {
        $this->pluginServices = iterator_to_array($pluginServices);
    }

    public function getPluginServiceByIdentifier(string $identifier): PluginInterface
    {
        return $this->pluginServices[$identifier];
    }
}
