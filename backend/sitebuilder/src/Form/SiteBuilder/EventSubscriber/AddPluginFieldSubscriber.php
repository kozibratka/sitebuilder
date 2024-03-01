<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\GridCellItem;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Traversable;

class AddPluginFieldSubscriber implements EventSubscriberInterface
{
    private $pluginServices;
    public $syncById = false;

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
        if($plugin && $plugin['identifier']) {
            $identifier = $plugin['identifier'];
            $formClass = $this->pluginServices[$identifier]->getFormClass();
        }
        if(isset($data['id']) && !$this->syncById) {
            $gridCellItem = $this->entityManager->getRepository(GridCellItem::class)->find($data['id']);
            if($gridCellItem) {
                $form->setData($gridCellItem);
            }else{
                throw new CustomErrorMessageException('Pokoušíte se upravit element, který je již smazaný');
            }
        } else {
            $gridCellItem = new GridCellItem();
            $form->setData($gridCellItem);
        }
        if(isset($plugin['id']) && !$this->syncById) {
            $pluginDb = $this->entityManager->getRepository(BasePlugin::class)->find($plugin['id']);
            if($pluginDb->getWeb()) {
                $data['plugin'] = $plugin['id'];
                $event->setData($data);
                $form->add('plugin', EntityType::class, ['class' => get_class($pluginDb), 'choices' => [$pluginDb]]);
                return;
            }
        }
        $form->add('plugin', $formClass);
        if (!isset($plugin['id'])) {
            $form->get('plugin')->setData(null);
        }
    }
}
