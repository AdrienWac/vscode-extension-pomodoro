<?php

namespace App\Application\Controller;

use App\Application\DTO\PostItemRequestDTO;
use App\Domain\Entity\PostItemRequest;
use App\Domain\Presenter\PostItemPresenterInterface;
use App\Domain\UseCase\UseCaseInterface;

/**
 * Porte d'entrée de l'application pour les commandes CLI Symfony de création d'item 
 */
class PostItemSymfonyCliController implements PostItemInterface, ControllerInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony_cli';

    public function __construct(
        private readonly UseCaseInterface $useCase, 
        // private readonly PostItemPresenterInterface $presenter
    ){}

    public static function getIndex(): string
    {
        return self::SERVICE_TAG_INDEX;
    }

    public function create(object $cliPostItem)
    {
        var_dump($cliPostItem);
        
        $postItemRequest = PostItemRequestDTO::cliToDomain($cliPostItem);

        var_dump($postItemRequest);die;

        // $this->useCase->execute($postItemRequest, $this->presenter);
        
        // return $this->presenter->viewModel;
    }

    
}