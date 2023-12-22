<?php

namespace App\Application\ViewModel;

/**
 * Objet Item utilisable par la vue
 */
class ItemViewModel
{

    public function __construct(protected string $title, protected string $description)
    { }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function setTitle(string $_title): void
    {
        $this->title = $_title;
    }

    public function setDescription(string $_description): void
    {
        $this->description = $_description;
    }
}