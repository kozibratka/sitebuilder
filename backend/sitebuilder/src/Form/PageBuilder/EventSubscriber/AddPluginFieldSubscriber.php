<?php

namespace App\Form\PageBuilder\EventSubscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Traversable;

class AddPluginFieldSubscriber implements EventSubscriberInterface
{
    private $pluginServices;

    public function __construct(Traversable $pluginServices)
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
        if (!isset($data['plugin'])) {
            return;
        }
        $plugin = $data['plugin']['basePlugin'];
        $identifier = $plugin['identifier'];
        $formClass = $this->pluginServices[$identifier]->getFormClass();
        $form->add('plugin', $formClass);
    }

}
