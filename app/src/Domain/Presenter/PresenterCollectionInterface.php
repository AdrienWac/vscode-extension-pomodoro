<?php

namespace App\Domain\Presenter;

interface PresenterCollectionInterface
{
    public function getPresenter(string $key): PresenterInterface;
}