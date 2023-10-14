<?php

namespace App\Entity\SiteBuilder\Plugin\Form;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class PluginForm extends BasePlugin
{
    #[ORM\Column(type: 'json')]
    private $form;
    #[ORM\OneToMany(targetEntity: FormData::class, mappedBy: 'form')]
    private $formData;

    #[ORM\Column(type: 'string', nullable: true)]
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

    public function setIdentifier()
    {
        $this->identifier = 'form_v1';
    }
}
