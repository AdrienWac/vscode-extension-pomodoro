<?php

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;
use Symfony\Component\HttpFoundation\Request;

class PostCreateItemControllerSymfony implements CreateItemInterface
{

  public function create(object $request): PostCreateItemResponse
  {
    var_dump($request->getContent());die;
    return new PostCreateItemResponse();
  }

}