<?php

namespace App\Application\ViewModel;

/**
 * Objet utilisable par les View qui passe par la CLI pour créer un item. 
 * Retourne l'objet ViewModel de l'item, et l'objet ViewModel des erreurs.
 */
class PostItemCliViewModel extends CliViewModel
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