<?php
 
namespace App\Domain;

use App\Domain\Entity\Item;

class PostItemResponse 
{
    protected ?Error $error;

    protected ?Item $item;

    public function getError(): ?Error
    {
        return $this->error;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }
}