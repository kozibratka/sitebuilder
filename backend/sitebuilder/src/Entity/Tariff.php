<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'tariff')]
class Tariff
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id = null;
    #[ORM\Column(type: 'string')]
    private string $name = '';
    #[ORM\Column(type: 'float')]
    private float $disk = 0;
    #[ORM\Column(type: 'integer')]
    private int $pages = 0;
    #[ORM\Column(type: 'integer')]
    private int $domains = 0;
    #[ORM\Column(type: 'integer')]
    private int $plugins = 0;
    #[ORM\Column(type: 'integer')]
    private int $blocks = 0;
    #[ORM\Column(type: 'integer')]
    private int $rows = 0;
    #[ORM\Column(type: 'integer')]
    private int $cells = 0;
    #[ORM\Column(type: 'integer')]
    private int $cellItems = 0;
    #[ORM\Column(type: 'integer')]
    private int $webs = 0;

    #[ORM\Column(type: 'integer')]
    private int $pluginItems = 0;
    #[ORM\Column(type: 'integer')]
    private int $pluginFormData = 0;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function getDisk(): float
    {
        return $this->disk;
    }

    public function setDisk(float $disk): void
    {
        $this->disk = $disk;
    }

    public function getPages(): int
    {
        return $this->pages;
    }

    public function setPages(int $pages): void
    {
        $this->pages = $pages;
    }

    public function getDomains(): int
    {
        return $this->domains;
    }

    public function setDomains(int $domains): void
    {
        $this->domains = $domains;
    }

    public function getPlugins(): int
    {
        return $this->plugins;
    }

    public function setPlugins(int $plugins): void
    {
        $this->plugins = $plugins;
    }

    public function getBlocks(): int
    {
        return $this->blocks;
    }

    public function setBlocks(int $blocks): void
    {
        $this->blocks = $blocks;
    }

    public function getRows(): int
    {
        return $this->rows;
    }

    public function setRows(int $rows): void
    {
        $this->rows = $rows;
    }

    public function getCells(): int
    {
        return $this->cells;
    }

    public function setCells(int $cells): void
    {
        $this->cells = $cells;
    }

    public function getCellItems(): int
    {
        return $this->cellItems;
    }

    public function setCellItems(int $cellItems): void
    {
        $this->cellItems = $cellItems;
    }

    public function getWebs(): int
    {
        return $this->webs;
    }

    public function setWebs(int $webs): void
    {
        $this->webs = $webs;
    }

    public function getPluginFormData(): int
    {
        return $this->pluginFormData;
    }

    public function setPluginFormData(int $pluginFormData): void
    {
        $this->pluginFormData = $pluginFormData;
    }

    public function getPluginItems(): int
    {
        return $this->pluginItems;
    }

    public function setPluginItems(int $pluginItems): void
    {
        $this->pluginItems = $pluginItems;
    }
}