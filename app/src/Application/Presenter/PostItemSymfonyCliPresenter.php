<?php

namespace App\Application\Presenter;

use App\Application\Mapper\ItemMapper;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\PostItemSymfonyCliViewModel;
use App\Application\ViewModel\ViewModelInterface;
use App\Domain\Entity\PostItemResponse;
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
        $hasErrors = !empty($response->getErrors());

        $this->viewModel->setHasError($hasErrors);

        if ($this->viewModel->getHasError()) {
            $this->viewModel->setErrorMessage('A EDITER');
        }
        
        if (!is_null($response->getItem())) {
            $itemViewModel = ItemMapper::domainToViewModel($response->getItem());
            $this->viewModel->setItem($itemViewModel);
        }
    }

    public function getViewModel(): ViewModelInterface
    {
        return $this->viewModel;
    }
}