<?php

namespace App\Domain;

final class Error
{
    protected int $code;

    protected string $message;

    public function getCode(): int
    {
        return $this->code;
    }

    public function getMessage(): string
    {
        return $this->message;
    }
}