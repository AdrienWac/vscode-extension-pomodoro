<?php

use App\Domain\Entity\PostItemRequest;

interface PostItemValidatorInterface
{
    public function validate(PostItemRequest $postItemRequest);

    public function getErrors();

    public function hasErrors(): bool;
}