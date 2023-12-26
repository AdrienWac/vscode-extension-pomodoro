<?php

namespace App\Application\Controller;

use App\Domain\Presenter\PostItemPresenterInterface;
use App\Domain\UseCase\CreateItem;
use App\Domain\UseCase\UseCaseInterface;
use Symfony\Component\HttpFoundation\Request;

class PostItemSymfonyController implements PostItemInterface, ControllerInterface
{
    const SERVICE_TAG_INDEX = 'post_item_symfony';
    
    public function __construct(protected UseCaseInterface $createItemUseCase, protected PostItemPresenterInterface $presenter)
    {
    }

    public function getIndex(): string
    {
        return self::SERVICE_TAG_INDEX;
    }

    public function create(object $externalRequest)
    {
        // Création d'un obj PostItem interne depuis l'objet $request
        $internalRequest = new CreateItem(
            $externalRequest->getContent()['title'], 
            $externalRequest->getContent()['description']
        );

        // Execution du use case CreateItem
        // $this->createItemUseCase->execute();
        // Render du view model du presenter passer en argument
        var_dump($externalRequest->getContent());die;
        // return new PostCreateItemResponse();
    }

}