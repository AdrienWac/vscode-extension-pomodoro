<?php

namespace App\Application\Presenter;

use App\Application\DTO\ItemDTO;
use App\Application\ViewModel\PostItemCliViewModel;
use App\Domain\PostItemResponse;
use App\Domain\Presenter\PostItemPresenterInterface;

/**
 * Transforme la Response venant du Domain en ViewModel utilisable 
 * par les View qui utilisent la CLI. 
 */
class PostItemCliPresenter implements PostItemPresenterInterface
{

    protected PostItemCliViewModel $viewModel;

    /**
     * Transform object response from domain to object for Vue JS
     */
    public function present(PostItemResponse $response): void
    {   
        // Si la response a des erreurs on prépare le viewModel pour rendre des erreurs avec la console symfony
        // On y met tous les infos utiles pour rendre des erreurs
        // Si pas d'erreur on prépare le view model pour rendre l'item comme on le souhaite avec la console symfony
        $itemViewModel = ItemDTO::domainToViewModel($response->getItem());
        $this->viewModel->setItem($itemViewModel);
    }

}