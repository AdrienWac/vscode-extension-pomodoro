<?php

namespace App\Application\ViewModel;

/**
 * Objet utilisable par les View qui passe par l'API pour créer un item. 
 * Retourne l'objet ViewModel de l'item, et l'objet ViewModel des erreurs.
 */
class PostItemApiViewModel extends ApiViewModel
{

    public function __construct(protected ?ItemViewModel $item = null)
    {}

    public function setItem(ItemViewModel $_item): void
    {
        $this->item = $_item;
    }
    
    public function getItem(): ItemViewModel
    {
        return $this->item;
    }

}