<?php

declare(strict_types=1);

namespace App\Controller;

use App\Form\Website\ContactType;
use App\Form\Website\NewsletterEmailType;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bridge\Twig\Mime\TemplatedEmail;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Address;
use Symfony\Component\RateLimiter\RateLimiterFactory;
use Symfony\Component\Routing\Annotation\Route;

#[Route('website', name: 'website_')]
class WebsiteController extends BaseApiController
{

    #[Route('/contact', name: 'contact', methods:['POST'])]
    public function contact(
        Request $request,
        EntityManagerInterface $entityManager,
        RateLimiterFactory $contactFormLimiter,
        MailerInterface $mailer,
    ): Response
    {
        $form = $this->createForm(ContactType::class);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            $contactFormLimiter->create($request->getClientIp())->consume()->ensureAccepted();
            $contact = $form->getData();
            $entityManager->persist($contact);
            $entityManager->flush();
            $email = (new TemplatedEmail())
                ->from($this->getParameter('app.email_no_reply'))
                ->to($this->getParameter('app.contact_email'))
                ->subject('Email z kontaktního formuláře')
                ->htmlTemplate('email/Website/website_contact.html.twig')
                ->context([
                    'websiteContact' => $contact,
                ]);
            $mailer->send($email);
            return $this->json([]);
        }
        return $this->invalidFormResponse($form);
    }

    #[Route('/newsletter', name: 'newsletter', methods:['POST'])]
    public function newsletter(
        Request $request,
        EntityManagerInterface $entityManager,
        RateLimiterFactory $contactFormLimiter,
    ) {
        $form = $this->createForm(NewsletterEmailType::class);
        $form->submit($request->request->all());
        if ($form->isValid()) {
            $contactFormLimiter->create($request->getClientIp().'newsletter')->consume()->ensureAccepted();
            $newsletter = $form->getData();
            $entityManager->persist($newsletter);
            $entityManager->flush();
            return $this->json([]);
        }
        return $this->invalidFormResponse($form);
    }
}
