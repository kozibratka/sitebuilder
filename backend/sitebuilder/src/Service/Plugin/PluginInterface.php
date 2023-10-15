<?php


namespace App\Service\Plugin;


interface PluginInterface
{
    public function getFormClass(): string;
    public function getEntityClass(): string;
}
