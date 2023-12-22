<?php

namespace App\Domain\Entity;

class Item
{
    protected ?string $id = null;

    public function __construct(protected string $title, protected string $description)
    {}

    public function getId(): string
    {
        return $this->id;    
    }

    public function getTitle(): string
    {
        return $this->title;
    }

    public function getDescription(): string
    {
        return $this->description;
    }
}