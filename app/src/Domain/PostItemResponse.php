<?php
 
namespace App\Domain;

use App\Domain\Entity\Item;

class PostItemResponse 
{
    public function __construct(protected ?Item $item, protected ?Error $error)
    {}

    public function getError(): ?Error
    {
        return $this->error;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }
}