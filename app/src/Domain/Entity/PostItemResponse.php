<?php
 
namespace App\Domain\Entity;

use App\Domain\Entity\Item;

class PostItemResponse 
{   
    /**
     * @param Item|null $item
     * @param Error|null $error
     */
    public function __construct(protected ?Item $item, protected ?Error $error)
    {}
    
    /**
     * @return Error|null
     */
    public function getError(): ?Error
    {
        return $this->error;
    }

    /**
     * @return Item|null
     */
    public function getItem(): ?Item
    {
        return $this->item;
    }
}