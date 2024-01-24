<?php

namespace App\Application\Controller\PostItem;

use App\Application\Controller\ControllerInterface;
use App\Domain\UseCase\CreateItem;
use App\Domain\API\Presenter\PresenterInterface;
use App\Application\Mapper\PostItemRequestMapper;
use App\Domain\API\Presenter\PresenterCollectionInterface;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\CliViewModel;
use App\Domain\SPI\Validator\PostItemValidatorInterface;

/**
 * Porte d'entrée de l'application pour les commandes CLI Symfony de création d'item 
 */
class PostItemSymfonyCliController extends ServiceCollectionAbstract implements PostItemInterface, ControllerInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony_cli';

    private PresenterInterface $presenter;

    public function __construct(
        private readonly CreateItem $useCase, 
        private readonly PresenterCollectionInterface $presenterCollection,
        private readonly PostItemValidatorInterface $postItemValidator
    )
    {
        $this->presenter = $presenterCollection->getPresenter(self::SERVICE_TAG_INDEX);
    }

    public function createItem(object $cliPostItem): CliViewModel
    {
        $postItemRequest = PostItemRequestMapper::cliToDomain($cliPostItem);

        $this->useCase->execute(
            $postItemRequest, 
            $this->presenter, 
            $this->postItemValidator
        );
        
        return $this->presenter->getViewModel();
    }

    
}