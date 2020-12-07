<?php

namespace App\Form\PageBuilder\EventSubscriber;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Form\FormEvent;
use Symfony\Component\Form\FormEvents;

class AddGridstackItemFromDatabaseSubscriber implements EventSubscriberInterface
{

    /** @required  */
    public EntityManagerInterface $em;

    public static function getSubscribedEvents(): array
    {
        return [
            FormEvents::PRE_SUBMIT => 'onPreSubmit',
        ];
    }

    public function onPreSubmit(FormEvent $event): void {
        //$submitedData = $event->getData();
//        $modelData = $event->getForm()->getViewData();
//        if($modelData) {
//        }
    }
}
