<?php

namespace App\UI\CLI\Command;

final class PostItemRequestSymfonyCliModel
{
    public function __construct(
        public readonly string $title,
        public readonly string $description
    ) {}
}