<?php

namespace App\Form\SiteBuilder\EventSubscriber;

use App\Entity\SiteBuilder\PageBlockAssignment;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class PageBlockAssignmentSubsrciber implements EventSubscriberInterface
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
            $assignment = $this->entityManager->getRepository(PageBlockAssignment::class)->find($data['id']);
            $form->setData($assignment);
        }
    }
}