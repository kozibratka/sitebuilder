<?php

namespace App\Entity;


use App\Constant\Limit;
use App\Entity\Util\Enum\LoginTypeEnum;
use App\Entity\Web\Web;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use JMS\Serializer\Annotation as Serializer;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * @UniqueEntity("email")
 */
#[ORM\Table(name: 'user')]
#[ORM\Entity]
class User implements UserInterface
{
    /**
     * @Serializer\Exclude()
     */
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: 'AUTO')]
    #[ORM\Column(type: 'integer')]
    private ?int $id = null;

    /**
     * @Assert\NotBlank
     * @Assert\Length(min="3")
     * @Serializer\Groups({"default", "user"})
     */
    #[ORM\Column(type: 'string')]
    private string $fullName = '';

    /**
     * @Assert\NotBlank(groups={"FORM", "email"}))
     * @Assert\Email(groups={"FORM", "email"}))
     * @Serializer\Groups({"default", "user"})
     */
    #[ORM\Column(type: 'string')]
    private string $email = '';

    /**
     * @Assert\NotBlank(groups={"FORM", "password"}))
     * @Assert\Length(min="6", groups={"FORM", "password"})
     * @Serializer\Exclude()
     */
    #[ORM\Column(type: 'string')]
    private ?string $password = '';

    #[ORM\OneToMany(targetEntity: Web::class, mappedBy: 'user', cascade: ['persist'])]
    private Collection $webs;

    /**
     * @Serializer\Groups({"default", "user"})
     */
    #[ORM\Column(type: 'boolean')]
    private bool $lockBuilderMenu = true;

    #[ORM\Column(type: 'json')]
    /**
     * @Serializer\Groups({"default", "user"})
     */
    private array $roles = [];

    #[ORM\Column(type: 'string')]
    private string $hash = '';

    #[ORM\Column(type: 'login_type_enum')]
    private LoginTypeEnum $loginType = LoginTypeEnum::Form;
    #[ORM\Column(type: 'simple_array', nullable: true)]
    private array $loginAttr = [];
    #[Assert\Count(
        max: Limit::RESET_PASSWORD_ATTEMPTS,
        maxMessage: 'You cannot specify more than {{limit}}',
    )]
    #[ORM\OneToMany(targetEntity: ResetPassword::class, mappedBy: 'user', cascade: ['persist', 'remove'], orphanRemoval: true)]
    private Collection $resetPasswords;
    #[ORM\ManyToOne(targetEntity: Tariff::class)]
    private Tariff $tariff;

    public function __construct()
    {
        $this->webs = new ArrayCollection();
        $this->resetPasswords = new ArrayCollection();
    }

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
        return $this->roles;
    }

    public function addRole($role) {
        if (!in_array($role, $this->roles)) {
            $this->roles[] = $role;
        }
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(?string $password) {
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

    public function getWebs(): ArrayCollection|Collection
    {
        return $this->webs;
    }

    public function setWebs(ArrayCollection|Collection $webs)
    {
        $this->webs = $webs;
    }

    public function addWeb(Web $web)
    {
        if(!$this->webs->contains($web)) {
            $this->webs->add($web);
            $web->setUser($this);
        }
    }

    public function removeWeb(Web $web) {
        $this->webs->removeElement($web);
    }

    public function getUserIdentifier(): string
    {
        return $this->getEmail();
    }

    public function isLockBuilderMenu(): bool
    {
        return $this->lockBuilderMenu;
    }

    public function setLockBuilderMenu(bool $showBuilderMenu): void
    {
        $this->lockBuilderMenu = $showBuilderMenu;
    }

    public function getHash(): string
    {
        return $this->hash;
    }

    public function setHash(string $hash): void
    {
        $this->hash = $hash;
    }

    public function getLoginType(): LoginTypeEnum
    {
        return $this->loginType;
    }

    public function setLoginType(LoginTypeEnum $loginType): void
    {
        $this->loginType = $loginType;
    }

    public function getLoginAttr(): array
    {
        return $this->loginAttr;
    }

    public function setLoginAttr(array $loginAttr): void
    {
        $this->loginAttr = $loginAttr;
    }

    public function getResetPasswords(): Collection
    {
        return $this->resetPasswords;
    }

    public function setResetPasswords(Collection $resetPasswords): void
    {
        $this->resetPasswords = $resetPasswords;
    }

    public function addResetPassword($resetPassword)
    {
        $this->resetPasswords->add($resetPassword);
        $resetPassword->setUser($this);
    }

    public function removeResetPassword($resetPassword)
    {
        $this->resetPasswords->removeElement($resetPassword);
        $resetPassword->setUser(null);
    }

    public function getTariff(): Tariff
    {
        return $this->tariff;
    }

    public function setTariff(Tariff $tariff): void
    {
        $this->tariff = $tariff;
    }
}
