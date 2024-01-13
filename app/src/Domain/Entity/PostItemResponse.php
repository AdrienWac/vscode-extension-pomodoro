<?php
 
namespace App\Domain\Entity;

use App\Domain\Entity\Item;

class PostItemResponse 
{   
    /**
     * @param Item|null $item
     * @param Error[]|null $errors
     */
    public function __construct(protected ?Item $item, protected ?array $errors)
    {}
    
    /**
     * @return Error[]|null
     */
    public function getErrors(): ?array
    {
        return $this->errors;
    }

    /**
     * @return Item|null
     */
    public function getItem(): ?Item
    {
        return $this->item;
    }
}