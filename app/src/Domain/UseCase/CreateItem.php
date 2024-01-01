<?php 

namespace App\Domain\UseCase;

use App\Domain\Entity\Item;
use App\Domain\Entity\PostItemRequest;
use App\Domain\Presenter\PresenterInterface;

class CreateItem implements UseCaseInterface
{
  public function execute(PostItemRequest $postItemRequest, PresenterInterface $presenter)
  {
    // Instanciate new Item object domain
    $item = new Item(
        title: $postItemRequest->getTitle(),
        description: $postItemRequest->getDescription()
    );

    echo "-- Item Domain Entity --";
    var_dump($item);
    echo "------";
    die;
    // Validate data of object domain
    // Repository save object
  }
}