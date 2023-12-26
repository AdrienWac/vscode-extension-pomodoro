<?php

namespace App\Application\Controller;

final class ControllerCollection implements ControllerCollectionInterface
{
    public function __construct(protected iterable $controllers)
    {
        $this->controllers = $this->controllers instanceof \Traversable ? 
            iterator_to_array($this->controllers) : $this->controllers;
    }

    /**
     * Get PostItemController by key
     *
     * @param string $key 
     * @return ControllerInterface
     */
    public function getController(string $key): ControllerInterface
    {
        return $this->controllers[$key];
    }
}