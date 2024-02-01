<?php

namespace App\Application\Mapper;

use App\Application\ViewModel\ItemViewModel;
use App\Domain\Entity\Item;
use App\UI\HTTP\REST\Model\Item as ItemModelSymfonyApi;
use App\UI\HTTP\REST\Model\ModelList;

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

    public static function domainToSymfonyApiViewModel(Item $item): ItemModelSymfonyApi
    {
        return new ItemModelSymfonyApi([
            'title' => $item->getTitle(),
            'description' => $item->getDescription(),
            'list' => new ModelList(
                ['name' => 'Lorem ipsum']
            ),
            'createdAt' => new \DateTime()
        ]);
    }
}