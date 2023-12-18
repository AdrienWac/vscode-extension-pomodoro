<?php

namespace App\Domain\Entity;

class Item
{
  protected ?string $id = null;

  public function __construct(protected string $name, protected string $description)
  {
    
  }
}