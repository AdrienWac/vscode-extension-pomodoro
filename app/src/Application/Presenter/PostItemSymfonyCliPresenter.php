<?php

namespace App\Application\Presenter;

use App\Application\DTO\ItemDTO;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\PostItemSymfonyCliViewModel;
use App\Application\ViewModel\ViewModelInterface;
use App\Domain\PostItemResponse;
use App\Domain\API\Presenter\PostItemPresenterInterface;
use App\Domain\API\Presenter\PresenterInterface;

/**
 * Transforme la Response venant du Domain en ViewModel utilisable 
 * par les View qui utilisent la CLI. 
 */
class PostItemSymfonyCliPresenter extends ServiceCollectionAbstract implements PostItemPresenterInterface
{

    protected PostItemSymfonyCliViewModel $viewModel;

    const SERVICE_TAG_INDEX = 'post_item_symfony_cli';

    /**
     * Transform object response from domain to object for Symfony Cli
     */
    public function present(PostItemResponse $response): void
    {   
        // Si la response a des erreurs on prépare le viewModel pour rendre des erreurs avec la console symfony
        // On y met tous les infos utiles pour rendre des erreurs
        // Si pas d'erreur on prépare le view model pour rendre l'item comme on le souhaite avec la console symfony
        $itemViewModel = ItemDTO::domainToViewModel($response->getItem());
        $this->viewModel->setItem($itemViewModel);
    }

    public function getViewModel(): ViewModelInterface
    {
        return $this->viewModel;
    }
}