<?php

namespace App\Application\Presenter;

use App\Application\DTO\ItemDTO;
use App\Application\ViewModel\PostItemApiViewModel;
use App\Domain\PostItemResponse;
use App\Domain\Presenter\PostItemPresenterInterface;

/**
 * Transforme la Response venant du Domain en ViewModel utilisable 
 * par les View qui utilisent l'API. 
 */
class PostItemApiPresenter implements PostItemPresenterInterface
{

    protected PostItemApiViewModel $viewModel;

    /**
     * Transform object response from domain to object for Vue JS
     */
    public function present(PostItemResponse $response): void
    {
        $this->viewModel->setItem(ItemDTO::domainToViewModel($response->getItem()));
    }

}