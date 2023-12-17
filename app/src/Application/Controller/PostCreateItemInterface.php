<?php 

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;

interface PostCreateItemInterface 
{
  public function create(Object $externalRequest): PostCreateItemResponse;
}