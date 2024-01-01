<?php

namespace App\Application\Utils;

abstract class ServiceCollectionAbstract
{
    const SERVICE_TAG_INDEX = '';   

    public static function getIndex(): string
    {
        return static::SERVICE_TAG_INDEX;
    }
}