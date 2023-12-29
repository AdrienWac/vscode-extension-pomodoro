<?php

namespace App\Application\Controller;

interface ControllerInterface {
    /**
     * Method that will be called to get the value used to index the services.
     *
     * @return string
     */
    public static function getIndex(): string;
}