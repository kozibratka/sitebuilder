<?php

namespace App\Entity\SiteBuilder\Plugin\Form;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class FormData
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'simple_array')]
    private $data;

    #[ORM\ManyToOne(targetEntity: PluginForm::class, inversedBy: 'formData')]
    private $form;

    public function getData()
    {
        return $this->data;
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getForm()
    {
        return $this->form;
    }

    public function setForm($form)
    {
        $this->form = $form;
    }
}
