<?php 

namespace App\Domain\API\Presenter;

use App\Application\ViewModel\ViewModelInterface;

interface PresenterInterface
{
    /**
     * Method that will be called to get the value used to index the services.
     *
     * @return string
     */
    public static function getIndex(): string;

    public function getViewModel(): ViewModelInterface;
}