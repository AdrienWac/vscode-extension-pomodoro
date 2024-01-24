<?php

namespace App\Application\ViewModel;

use App\UI\HTTP\REST\Model\Error as ErrorModelSymfonyApi;
use App\UI\HTTP\REST\Model\Item as ItemModelSymfonyApi;

class PostItemSymfonyApiViewModel implements ViewModelInterface
{
    public function __construct(
        protected ?ItemModelSymfonyApi $item,
        protected ?ErrorModelSymfonyApi $error,
        protected int $code = 200
    )
    {}
    
    public function setCode(int $_code): void
    {
        $this->code = $_code;
    }

    public function setItem(ItemModelSymfonyApi $_itemModelSymfonyApi): void
    {
        $this->item = $_itemModelSymfonyApi;
    }

    public function setError(ErrorModelSymfonyApi $_errorModelSymfonyApi): void
    {
        $this->error = $_errorModelSymfonyApi;
    }

    public function getCode(): int
    {
        return $this->code;
    }

    public function getItem(): ItemModelSymfonyApi
    {
        return $this->item;
    }

    public function getError(): ErrorModelSymfonyApi
    {
        return $this->error;
    }
}