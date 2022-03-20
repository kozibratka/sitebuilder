<?php

namespace App\Entity\SiteBuilder\Plugin;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="article_plugin")
 */
class ArticlePlugin extends BasePlugin
{
    /**
     * @ORM\Column(type="text")
     */
    private string $article;

    public function setIdentifier()
    {
        $this->identifier = 'article_plugin';
    }

    public function getArticle(): string
    {
        return $this->article;
    }

    public function setArticle(string $article)
    {
        $this->article = $article;
    }
}
