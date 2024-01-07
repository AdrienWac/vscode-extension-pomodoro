<?php

namespace App\Domain\Presenter;

use App\Domain\PostItemResponse;

interface PostItemPresenterInterface extends PresenterInterface
{
  public function present(PostItemResponse $response);
}