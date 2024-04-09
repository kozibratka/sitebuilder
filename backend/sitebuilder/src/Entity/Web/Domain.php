<?php

namespace App\Entity\Web;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity]
#[ORM\Table(name: 'domain')]
#[UniqueEntity(
    fields: ['name']
)]
class Domain
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer', nullable: true)]
    private ?int $id = null;

    #[ORM\Column(type: 'string', nullable: true)]
    #[Assert\Hostname(message: 'Invalid domain')]
    private ?string $name = '';
    #[ORM\ManyToOne(targetEntity: Web::class, inversedBy: 'domains')]
    private Web $web;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(?string $name): void
    {
        $this->name = $name;
    }

    public function getWeb(): Web
    {
        return $this->web;
    }

    public function setWeb(Web $web): void
    {
        $this->web = $web;
    }
}