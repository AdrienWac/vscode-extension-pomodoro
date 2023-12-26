<?php 

namespace App\Domain\UseCase;

use App\Domain\Entity\PostItemRequest;
use App\Domain\Presenter\PostItemPresenterInterface;

class CreateItem
{
  public function execute(PostItemRequest $postItemRequest, PostItemPresenterInterface $postItemPresenter)
  {
    // Instanciate new Item object domain
    // Validate data of object domain
    // Repository save object
  }
}