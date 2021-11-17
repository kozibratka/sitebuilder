<?php

namespace App\Entity;


use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @ORM\Entity
 * @ORM\Table(name="user")
 * @UniqueEntity("email")
 */
class User implements UserInterface
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     * @ORM\Column(type="integer")
     * @Serializer\Exclude()
     */
    private int $id;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     * @Assert\Length(min="3")
     */
    private string $fullName;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     * @Assert\Email
     */
    private string $email;

    /**
     * @ORM\Column(type="string")
     * @Assert\NotBlank
     * @Assert\Length(min="6")
     */
    private string $password;

    public function getId(): int
    {
        return $this->id;
    }

    public function setId(int $id)
    {
        $this->id = $id;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function setEmail(string $email)
    {
        $this->email = $email;
    }

    public function getRoles()
    {
        return ['ROLE_USER'];
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password) {
        $this->password = $password;
    }

    public function getSalt()
    {
    }

    public function getUsername()
    {
        return $this->getEmail();
    }

    public function eraseCredentials()
    {
    }

    public function getFullName(): string
    {
        return $this->fullName;
    }

    public function setFullName(string $fullName)
    {
        $this->fullName = $fullName;
    }

    public function getUserIdentifier(): string
    {
        return $this->getEmail();
    }
}
