<?php

namespace App\Entity\SiteBuilder\Plugin\Form\FormV1;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\Table(name: 'form_v1')]
class FormV1
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'json')]
    private $form;
    #[ORM\OneToMany(targetEntity: FormV1Data::class, mappedBy: 'form')]
    private $formData;

    #[ORM\Column(type: 'string')]
    private $email;

    public function getForm()
    {
        return $this->form;
    }

    public function setForm($form)
    {
        $this->form = $form;
    }

    public function getFormData()
    {
        return $this->formData;
    }

    public function setFormData($formData)
    {
        $this->formData = $formData;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }
}
