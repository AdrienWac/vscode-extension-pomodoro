<?php

namespace App\Application\Presenter;

use App\Application\DTO\ItemDTO;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\PostItemApiViewModel;
use App\Application\ViewModel\ViewModelInterface;
use App\Domain\PostItemResponse;
use App\Domain\API\Presenter\PostItemPresenterInterface;

/**
 * Transforme la Response venant du Domain en ViewModel utilisable 
 * par les View qui utilisent l'API. 
 */
class PostItemApiPresenter extends ServiceCollectionAbstract implements PostItemPresenterInterface
{
    const SERVICE_TAG_INDEX = 'post_item_api';

    protected PostItemApiViewModel $viewModel;

    /**
     * Transform object response from domain to object for Vue JS
     */
    public function present(PostItemResponse $response): void
    {
        $this->viewModel->setItem(ItemDTO::domainToViewModel($response->getItem()));
    }

    public function getViewModel(): ViewModelInterface
    {
        return $this->viewModel;
    }

}