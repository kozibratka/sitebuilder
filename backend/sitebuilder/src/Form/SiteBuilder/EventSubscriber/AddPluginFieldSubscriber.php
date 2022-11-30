<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PaletteGridItem;
use App\Exception\CustomErrorMessageException;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;
use Symfony\Component\Security\Core\Security;
use Traversable;

class AddPluginFieldSubscriber implements EventSubscriberInterface
{
    /** @required  */
    public EntityManagerInterface $em;
    private $pluginServices;
    private $toRemovePlugin = [];
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
            $paletteGridItem = $this->em->getRepository(PaletteGridItem::class)->find($data['id']);
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

        $form->add('plugin', $formClass);
    }
}
