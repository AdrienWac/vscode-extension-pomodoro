<?php

namespace App\Application\Controller;

interface ControllerCollectionInterface
{
    /**
     * Application Controller are registred by tag in service container.
     * Use iterator collection to retrieve specific Controller.
     * 
     * @param string $key Provide in service container tag.
     * @return PostItemInterface
     */
    public function getController(string $key): ControllerInterface;
}