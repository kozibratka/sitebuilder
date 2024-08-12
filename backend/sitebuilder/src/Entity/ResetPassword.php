<?php

namespace App\Entity;

use App\Helper\Helper;
use Doctrine\ORM\Mapping as ORM;
use Gedmo\Mapping\Annotation\Timestampable;

#[ORM\Entity]
#[ORM\Table(name: 'reset_password')]
class ResetPassword
{
    #[ORM\Id()]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    #[ORM\Column(type: 'string')]
    private string $hashId = '';
    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'resetPassword')]
    private User $user;
    #[ORM\Column(type: 'datetime')]
    #[Timestampable(on: 'create')]
    private \DateTimeInterface $createdAt;

    public function __construct()
    {
        $this->hashId = Helper::randomString(20);
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): void
    {
        $this->id = $id;
    }

    public function getHashId(): string
    {
        return $this->hashId;
    }

    public function setHashId(string $hashId): void
    {
        $this->hashId = $hashId;
    }

    public function getUser(): User
    {
        return $this->user;
    }

    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): void
    {
        $this->createdAt = $createdAt;
    }
}