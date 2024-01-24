<?php

namespace App\Application\Controller\PostItem;

use App\Application\Controller\ControllerInterface;
use App\Domain\UseCase\CreateItem;
use App\Domain\API\Presenter\PresenterInterface;
use App\Application\Mapper\PostItemRequestMapper;
use App\Domain\API\Presenter\PresenterCollectionInterface;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\PostItemSymfonyApiViewModel;
use App\Domain\Entity\Error;
use App\Domain\Entity\PostItemResponse;
use App\Domain\SPI\Validator\PostItemValidatorInterface;

/**
 * Porte d'entrée de l'application pour les commandes CLI Symfony de création d'item 
 */
class PostItemSymfonyApiController extends ServiceCollectionAbstract implements PostItemInterface, ControllerInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony_api';

    private PresenterInterface $presenter;

    public function __construct(
        private readonly CreateItem $useCase,
        private readonly PresenterCollectionInterface $presenterCollection,
        private readonly PostItemValidatorInterface $postItemValidator
    )
    {
        $this->presenter = $presenterCollection->getPresenter(self::SERVICE_TAG_INDEX);
    }

    public function createItem(object $postItemRequestApiModel): PostItemSymfonyApiViewModel
    {   
        try {
            $postItemRequest = PostItemRequestMapper::openApiToDomain($postItemRequestApiModel);
            
            $this->useCase->execute(
                $postItemRequest, 
                $this->presenter, 
                $this->postItemValidator
            );
        } catch (\Throwable $th) {
            $response = new PostItemResponse(
                null, 
                new Error(400, $th->getMessage())
            );
            
            $this->presenter->present($response);
        }

        return $this->presenter->getViewModel();
    }

}