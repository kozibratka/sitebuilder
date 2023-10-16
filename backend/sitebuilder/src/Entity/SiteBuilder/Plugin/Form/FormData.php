<?php

namespace App\Entity\SiteBuilder\Plugin\Form;

use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation\Timestampable;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity]
class FormData
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private $id;

    #[ORM\Column(type: 'json')]
    private $data;

    #[ORM\ManyToOne(targetEntity: PluginForm::class, inversedBy: 'formData')]
    #[ORM\JoinColumn(onDelete: 'CASCADE')]
    /**
     * @Serializer\Exclude()
     */
    private $form;
    #[ORM\Column(type: 'datetime')]
    #[Timestampable(on: 'create')]
    #[Serializer\Type("DateTime<'d-m-Y H:i:s'>")]
    private $createdAt;

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

    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }
}
