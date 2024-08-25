<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PageBlock;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class PageBlockSubscriber implements EventSubscriberInterface
{
    public function __construct(
        private EntityManagerInterface $entityManager
    )
    {
    }

    public static function getSubscribedEvents(): array
    {
        return [
            FormEvents::PRE_SUBMIT => 'onPreSubmit',
        ];
    }

    public function onPreSubmit(FormEvent $event): void {
        $form = $event->getForm();
        $data = $event->getData();
        if (isset($data['id'])) {
            $pageBlock = $this->entityManager->getRepository(PageBlock::class)->find($data['id']);
            if ($pageBlock->isShared() || !$pageBlock->getWeb()) {
                $pageBlock->setReassigned(true);
                $form->setData($pageBlock);
            } else {
                $form->setData(new PageBlock());
            }
        } else {
            $form->setData(new PageBlock());
        }
    }
}