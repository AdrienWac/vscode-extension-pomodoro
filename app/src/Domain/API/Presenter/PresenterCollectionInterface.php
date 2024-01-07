<?php

namespace App\Domain\API\Presenter;

interface PresenterCollectionInterface
{
    public function getPresenter(string $key): PresenterInterface;
}