<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PaletteGridItem;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use App\Entity\SiteBuilder\Plugin\TextPlugin;
use App\Exception\CustomErrorMessageException;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\ORM\EntityRepository;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
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

    public function __construct(Traversable $pluginServices, private EntityManagerInterface $entityManager, private Security $security)
    {
        $this->pluginServices = iterator_to_array($pluginServices);
    }

    public static function getSubscribedEvents(): array
    {
        return [
            FormEvents::PRE_SUBMIT => 'onPreSubmit',
            FormEvents::POST_SUBMIT => 'onPostSubmit',
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
        }
        if($plugin) {
            $pluginChoices = new ArrayCollection($this->entityManager->getRepository(BasePlugin::class)->findBy(['user' => $this->security->getUser()]));
            /** @var PaletteGridItem $paletteGridItem */
            $paletteGridItem = $form->getData();
            if($plugin['id'] ?? null) {
                if($paletteGridItem?->getPlugin() && !$paletteGridItem->getPlugin()->getWeb()) {
                    $this->toRemovePlugin[] = $paletteGridItem->getPlugin();
                }
                $data['plugin'] = $plugin['id'];
                $event->setData($data);
                $form->add('plugin', EntityType::class, ['class' => BasePlugin::class, 'choices' => $pluginChoices ]);
            }
            else  {
                if($paletteGridItem?->getPlugin()?->getWeb()) {
                    $paletteGridItem->setPlugin(null);
                }
                $form->add('plugin', $formClass);
            }
        }
    }

    public function onPostSubmit() {
        foreach ($this->toRemovePlugin as $item) {
            $this->entityManager->remove($item);
        }
        $this->toRemovePlugin = [];
    }

}
