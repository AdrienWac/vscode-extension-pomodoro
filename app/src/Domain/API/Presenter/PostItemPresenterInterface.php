<?php

namespace App\Domain\API\Presenter;

use App\Domain\Entity\PostItemResponse;

interface PostItemPresenterInterface extends PresenterInterface
{
  public function present(PostItemResponse $response);
}