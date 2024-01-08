<?php

namespace App\Application\Mapper;

use App\Domain\Entity\PostItemRequest;
use App\UI\CLI\Command\PostItemRequestSymfonyCliModel;

final class PostItemRequestMapper
{
    /**
     * Transform Post Item Request Symfony CLI object to Post Item Request Domain
     *
     * @param PostItemRequestSymfonyCliModel $postItemRequestSymfonyCliModel
     * @return PostItemRequest
     */
    public static function cliToDomain(PostItemRequestSymfonyCliModel $postItemRequestSymfonyCliModel): PostItemRequest
    {
        return new PostItemRequest(
            title: $postItemRequestSymfonyCliModel->title,
            description: $postItemRequestSymfonyCliModel->description
        );
    }

    // public static function symfonyControllerToDomain()

}