<?php 

namespace App\Domain\UseCase;

use App\Domain\Entity\Item;
use App\Domain\Entity\PostItemRequest;
use App\Domain\API\Presenter\PostItemPresenterInterface;
use App\Domain\Entity\PostItemResponse;
use PostItemValidatorInterface;

class CreateItem implements UseCaseInterface
{
  public function execute(PostItemRequest $postItemRequest, PostItemPresenterInterface $presenter, PostItemValidatorInterface $postItemValidator)
  {
    // Validation de l'objet Request
    $postItemValidator->validate($postItemRequest);
    if ($postItemValidator->hasErrors()) {
        return new PostItemResponse(null, $postItemValidator->getErrors());
    }

    // Instanciate new Item object domain
    $item = new Item(
        title: $postItemRequest->getTitle(),
        description: $postItemRequest->getDescription()
    );

    echo "-- Item Domain Entity --";
    var_dump($item);
    echo "------";
    
    // Validate Item domain obj

    // Repository save object

    $postItemResponse = new PostItemResponse($item, null);

    $presenter->present($postItemResponse);
  }
}