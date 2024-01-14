<?php

namespace App\Domain\SPI\Validator;

use App\Domain\Entity\PostItemRequest;

interface ValidatorInterface
{
    public function validate(PostItemRequest $postItemRequest);

    public function getError();

    public function hasErrors(): bool;
}