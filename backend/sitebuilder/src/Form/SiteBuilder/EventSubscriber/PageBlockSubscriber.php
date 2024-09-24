<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PageBlock;
use App\Entity\SiteBuilder\PageBlockAssignment;
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
        /** @var PageBlock $pageBlock */
        $pageBlock = $form->getNormData();
        if (isset($data['id']) && isset($data['isShared']) && $data['isShared']) {
            if ($data['id'] == $pageBlock?->getId()) {
                return;
            }
            $pageBlock = $this->entityManager->getRepository(PageBlock::class)->find($data['id']);
            if ($pageBlock->isShared()) {
                $pageBlock->setReassigned(true);
                $form->setData($pageBlock);
            }
        } elseif (!($data['isShared'] ?? null) && $pageBlock?->isShared()) {
            $form->setData(new PageBlock());
        }
    }
}