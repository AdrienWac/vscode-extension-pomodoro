<?php

namespace App\Application\Controller;

use App\Domain\PostCreateItemResponse;

class SymfonyCliCreateItemController implements CreateItemInterface
{
    public function create(object $symfonyCliItem): PostCreateItemResponse
    {
        var_dump($symfonyCliItem);
        return new PostCreateItemResponse;
    }
}