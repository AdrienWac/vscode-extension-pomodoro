<?php

namespace App\Application\Mapper;

use App\Domain\Entity\PostItemRequest as PostItemRequestDomain;
use App\UI\CLI\Command\PostItemRequestSymfonyCliModel;
use App\UI\HTTP\REST\Model\Item;
use App\UI\HTTP\REST\Model\PostItemRequest as PostItemRequestModel;

final class PostItemRequestMapper
{
    /**
     * Transform Post Item Request Symfony CLI object to Post Item Request Domain
     *
     * @param PostItemRequestSymfonyCliModel $postItemRequestSymfonyCliModel
     * @return PostItemRequest
     */
    public static function cliToDomain(PostItemRequestSymfonyCliModel $postItemRequestSymfonyCliModel): PostItemRequestDomain
    {
        return new PostItemRequestDomain(
            title: $postItemRequestSymfonyCliModel->title,
            description: $postItemRequestSymfonyCliModel->description
        );
    }
    
    /**
     * Transform Post Item Request from OpenApi server to post item request for Domain
     *
     * @param PostItemRequestModel $postItemRequestModel
     * @return PostItemRequestDomain
     */
    public static function openApiToDomain(PostItemRequestModel $postItemRequestModel): PostItemRequestDomain
    {
        return new PostItemRequestDomain(
            title: $postItemRequestModel->getItem()->getTitle(),
            description: $postItemRequestModel->getItem()->getDescription()
        );
    }

}