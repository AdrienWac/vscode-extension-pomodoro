<?php

namespace App\Domain\Entity;

class Item
{
  public function __construct(protected string $name, protected string $description)
  {
    
  }
}