<?php

namespace App\Application\ViewModel;


class CliViewModel implements ViewModelInterface
{
    public function __construct(
        protected ?ItemViewModel $item = null,
        protected bool $hasError = false,
        protected ?string $errorMessage = null,
        protected ?int $errorCode = null 
    )
    {}

    public function setItem(ItemViewModel $_item): void
    {
        $this->item = $_item;
    }
    
    public function getItem(): ?ItemViewModel
    {
        return $this->item;
    }

    public function setHasError(bool $_hasError): void
    {
        $this->hasError = $_hasError;
    }

    public function getHasError(): bool
    {
        return $this->hasError;
    }

    public function setErrorMessage(string $_errorMessage): void
    {
        $this->errorMessage = $_errorMessage;
    }

    public function getErrorMessage(): string
    {
        return $this->errorMessage;
    }

    public function setErrorCode(int $_errorCode): void
    {
        $this->errorCode = $_errorCode;
    }
}