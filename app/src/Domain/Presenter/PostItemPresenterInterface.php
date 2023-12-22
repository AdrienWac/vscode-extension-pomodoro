<?php

namespace App\Domain\Presenter;

use App\Domain\PostItemResponse;

interface PostItemPresenterInterface
{
  public function present(PostItemResponse $response);
}