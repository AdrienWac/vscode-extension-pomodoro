<?php

namespace App\Application\Controller;

use App\Application\ViewModel\CliViewModel;
use App\Domain\Entity\PostItem;
use App\Domain\PostCreateItemResponse;
use App\Domain\Presenter\PostItemPresenterInterface;
use App\Domain\UseCase\UseCaseInterface;

/**
 * Porte d'entrée de l'application pour les commandes CLI Symfony de création d'item 
 */
class PostItemSymfonyCliController implements PostItemInterface
{
    public function __construct(
        private readonly UseCaseInterface $useCase, 
        private readonly PostItemPresenterInterface $presenter
    ){}

    public function create(object $cliPostItem)
    {
        var_dump($cliPostItem);
        
        $postItemRequest = new PostItem(
            title: $cliPostItem->getTitle(), 
            description: $cliPostItem->getDescription()
        );

        $this->useCase->execute($postItemRequest, $this->presenter);
        
        return $this->presenter->viewModel;
    }

    
}