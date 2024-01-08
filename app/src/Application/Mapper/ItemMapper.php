<?php

namespace App\Application\Mapper;

use App\Application\ViewModel\ItemViewModel;
use App\Domain\Entity\Item;

/**
 * Transforme les objets Item.
 * Presentation -> Domain
 * Domain -> Presentation
 * Infrastructure -> Domain
 * Domain -> Infrastructure
 */
class ItemMapper
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