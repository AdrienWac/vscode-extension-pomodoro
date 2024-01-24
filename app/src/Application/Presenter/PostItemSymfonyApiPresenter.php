<?php

namespace App\Application\Presenter;

use App\Application\Mapper\ItemMapper;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\PostItemSymfonyApiViewModel;
use App\Application\ViewModel\ViewModelInterface;
use App\Domain\Entity\PostItemResponse;
use App\Domain\API\Presenter\PostItemPresenterInterface;
use App\Domain\API\Presenter\PresenterInterface;
use App\UI\HTTP\REST\Model\Error;

/**
 * Transforme la Response venant du Domain en ViewModel utilisable 
 * par les View qui utilisent la CLI. 
 */
class PostItemSymfonyApiPresenter extends ServiceCollectionAbstract implements PostItemPresenterInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony_api';

    public function __construct(protected PostItemSymfonyApiViewModel $viewModel)
    {}

    /**
     * Transform object response from domain to object for Symfony API
     */
    public function present(PostItemResponse $response): void
    {   
        $hasError = !is_null($response->getError());

        if ($hasError) {
            $errorModelApiSymfony = new Error([
                'code' => $response->getError()->getCode(),
                'message' => $response->getError()->getMessage()
            ]);
            $this->viewModel->setError($errorModelApiSymfony);
            $this->viewModel->setCode($response->getError()->getCode());
        }
        
        if (!is_null($response->getItem())) {
            $itemViewModel = ItemMapper::domainToSymfonyApiViewModel($response->getItem());
            $this->viewModel->setItem($itemViewModel);
            $this->viewModel->setCode(200);
        }

        
    }

    public function getViewModel(): ViewModelInterface
    {
        return $this->viewModel;
    }
}