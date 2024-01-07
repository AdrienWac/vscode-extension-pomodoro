<?php

namespace App\Application\Presenter;

use App\Domain\API\Presenter\PresenterCollectionInterface;
use App\Domain\API\Presenter\PresenterInterface;

final class PresenterCollection implements PresenterCollectionInterface
{
    public function __construct(protected iterable $presenters)
    {
        $this->presenters = $this->presenters instanceof \Traversable ? 
            iterator_to_array($this->presenters) : $this->presenters;
    }

    /**
     * Get PresenterInterface implementation by key
     *
     * @param string $key 
     * @return PresenterInterface
     */
    public function getPresenter(string $key): PresenterInterface
    {
        return $this->presenters[$key];
    }
}