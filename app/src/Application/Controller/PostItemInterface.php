<?php 

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;

interface CreateItemInterface
{
  public function create(Object $externalRequest): PostCreateItemResponse;
}