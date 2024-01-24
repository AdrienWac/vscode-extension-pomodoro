<?php

namespace App\Application\Controller\PostItem;

use App\Application\Controller\ControllerInterface;
use App\Application\Mapper\PostItemRequestMapper;
use App\Application\Utils\ServiceCollectionAbstract;
use App\Application\ViewModel\ViewModelInterface;
use App\Domain\API\Presenter\PresenterCollectionInterface;
use App\Domain\SPI\Validator\PostItemValidatorInterface;
use App\Domain\UseCase\CreateItem;
use App\Domain\UseCase\UseCaseInterface;

class PostItemSymfonyController extends ServiceCollectionAbstract implements PostItemInterface, ControllerInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony';
    
    public function __construct(
        private readonly CreateItem $useCase, 
        private readonly PresenterCollectionInterface $presenterCollection,
        private readonly PostItemValidatorInterface $postItemValidator
    ){}

    public function createItem(object $cliPostItem): ViewModelInterface
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