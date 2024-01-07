<?php 

namespace App\Domain\UseCase;

use App\Domain\Entity\Item;
use App\Domain\Entity\PostItemRequest;
use App\Domain\PostItemResponse;
use App\Domain\Presenter\PostItemPresenterInterface;

class CreateItem implements UseCaseInterface
{
  public function execute(PostItemRequest $postItemRequest, PostItemPresenterInterface $presenter)
  {
    // Instanciate new Item object domain
    $item = new Item(
        title: $postItemRequest->getTitle(),
        description: $postItemRequest->getDescription()
    );

    echo "-- Item Domain Entity --";
    var_dump($item);
    echo "------";
    
    // Validate data of object domain
    // Repository save object

    $postItemResponse = new PostItemResponse($item, null);

    $presenter->present($postItemResponse);
  }
}