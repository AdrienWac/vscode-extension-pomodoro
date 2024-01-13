<?php

namespace App\Domain\Entity;

final class Error
{
    public function __construct(protected int $code, protected string $message)
    {}

    public function getCode(): int
    {
        return $this->code;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}