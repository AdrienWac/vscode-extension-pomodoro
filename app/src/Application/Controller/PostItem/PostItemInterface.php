<?php 

namespace App\Application\Controller\PostItem;

use App\Application\ViewModel\ViewModelInterface;
use stdClass;

interface PostItemInterface
{
  public function create(object $externalRequest): ViewModelInterface;
}