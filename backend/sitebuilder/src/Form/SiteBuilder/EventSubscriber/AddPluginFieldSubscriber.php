<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PaletteGridItem;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Security\Core\Security;
use Traversable;

class AddPluginFieldSubscriber implements EventSubscriberInterface
{
    private $pluginServices;
    public $isPreview = false;

    public function __construct(Traversable $pluginServices, private EntityManagerInterface $entityManager, private Security $security)
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
        if(isset($data['id'])) {
            $paletteGridItem = $this->entityManager->getRepository(PaletteGridItem::class)->find($data['id']);
            if($paletteGridItem) {
                $form->setData($paletteGridItem);
            }else{
                throw new CustomErrorMessageException('Pokoušíte se upravit element, který je již smazaný');
            }
        } else {
            /** @var PaletteGridItem $paletteGridItem */
            $paletteGridItem = new PaletteGridItem();
            $form->setData($paletteGridItem);
        }
        if(isset($plugin['id'])) {
            $pluginDb = $this->entityManager->getRepository(BasePlugin::class)->find($plugin['id']);
            if($pluginDb->getWeb()) {
                $data['plugin'] = ['id' => $plugin['id']]; //clear and set only id for entityType
                $form->add('plugin', EntityType::class, ['class' => BasePlugin::class, 'choices' => [$pluginDb]]);
                return;
            }
        }
        $form->add('plugin', $formClass);
    }
}
