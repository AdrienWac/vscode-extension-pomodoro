<?php

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;

class PostItemSymfonyCliController implements CreateItemInterface
{
    public function create(object $symfonyCliItem): PostCreateItemResponse
    {
        var_dump($symfonyCliItem);
        return new PostCreateItemResponse;
    }
}