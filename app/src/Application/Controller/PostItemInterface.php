<?php 

namespace App\Application\Controller;

use stdClass;

interface PostItemInterface
{
  public function create(object $externalRequest);
}