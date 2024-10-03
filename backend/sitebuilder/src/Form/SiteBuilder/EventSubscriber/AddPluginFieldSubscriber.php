<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\Plugin\BasePlugin;
use App\Entity\Plugin\Text\PluginText;
use App\Entity\SiteBuilder\GridCell;
use App\Entity\SiteBuilder\GridCellItem;
use App\Exception\CustomErrorMessageException;
use App\Form\SiteBuilder\GridRowType;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Traversable;

class AddPluginFieldSubscriber implements EventSubscriberInterface
{
    private $pluginServices;
    public $syncById = true;

    public function __construct(Traversable $pluginServices, private EntityManagerInterface $entityManager)
    {
        $this->pluginServices = iterator_to_array($pluginServices);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            FormEvents::PRE_SUBMIT => 'onPreSubmit',
        ];
    }

    public function onPreSubmit(FormEvent $event): void
    {
        $data = $event->getData();
        $form = $event->getForm();
        $plugin = $data['plugin'] ?? null;
        /** @var GridCellItem $gridCellItem */
        $gridCellItem = $event->getForm()->getNormData();
        $actualPlugin = $gridCellItem?->getPlugin();
        if ($plugin) {
            if($plugin && $plugin['identifier']) {
                $identifier = $plugin['identifier'];
                $formClass = $this->pluginServices[$identifier]->getFormClass();
            }
            if(isset($plugin['id']) && $this->syncById && ($plugin['isShared'] ?? false)) {
                $pluginDb = $this->entityManager->getRepository(BasePlugin::class)->find($plugin['id']);

                if($pluginDb && $pluginDb->isShared()) {
                    $data['plugin'] = $plugin['id'];
                    $event->setData($data);
                    $form->add('plugin', EntityType::class, ['class' => get_class($pluginDb), 'choices' => [$pluginDb]]);
                    return;
                }
            }
            $pluginData = $actualPlugin?->getIdentifier() == $plugin['identifier'] && !$actualPlugin?->isShared() ? $actualPlugin : null;
            $form->add('plugin', $formClass, ['data' => $pluginData]);
        }
    }
}
