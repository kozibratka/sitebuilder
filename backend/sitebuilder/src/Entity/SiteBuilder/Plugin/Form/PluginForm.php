<?php

namespace App\Entity\SiteBuilder\Plugin\Form;
use App\Entity\SiteBuilder\Plugin\BasePlugin;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;

#[ORM\Entity]
class PluginForm extends BasePlugin
{
    #[ORM\Column(type: 'json')]
    private $form;
    #[ORM\OneToMany(targetEntity: FormData::class, mappedBy: 'form', orphanRemoval: true, cascade: ['persist', 'remove'])]
    #[ORM\OrderBy(["id" => "DESC"])]
    /**
     * @Serializer\Exclude()
     */
    private $formData;

    #[ORM\Column(type: 'string', nullable: true)]
    private $email;

    private $hashId;

    public function __construct()
    {
        parent::__construct();
        $this->formData = new ArrayCollection();
    }
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

    public function getHashId()
    {
        return $this->hashId;
    }

    public function setHashId($hashId)
    {
        $this->hashId = $hashId;
    }

    public function addFormData(FormData $formData): self
    {
        $this->formData->add($formData);
        $formData->setForm($this);
        return $this;
    }

    public function removeFormData(FormData $formData): self
    {
        $this->formData->removeElement($formData);
        $formData->setForm(null);
        return $this;
    }
}
