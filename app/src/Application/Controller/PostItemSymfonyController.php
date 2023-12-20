<?php

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;
use App\Domain\UseCase\CreateItem;
use App\Domain\UseCase\UseCaseInterface;
use Symfony\Component\HttpFoundation\Request;

class PostItemSymfonyController implements CreateItemInterface
{
    public function __construct(protected UseCaseInterface $createItemUseCase, protected CreateItemPresenterInterface $presenter)
    {
    }

    public function create(Request $request): ressources
    {
        // Création d'un obj PostItem interne depuis l'objet $request
        $internalRequest = new CreateItem(
            $request->getContent()['title'], 
            $request->getContent()['description']
        );

        // Execution du use case CreateItem
        $this->createItemUseCase->execute()
        // Render du view model du presenter passer en argument
        var_dump($request->getContent());die;
        return new PostCreateItemResponse();
    }

}