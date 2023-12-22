<?php

namespace App\Application\DTO;

use App\Application\ViewModel\ItemViewModel;
use App\Domain\Entity\Item;

class ItemDTO
{
    /**
     * Transforme un Item du Domain en un Item ViewModel utilisable par les Views.
     *
     * @param Item $item
     * @return ItemViewModel
     */
    public static function domainToViewModel(Item $item): ItemViewModel
    {
        return new ItemViewModel(
            title: $item->getTitle(),
            description: $item->getDescription()
        );
    }
}