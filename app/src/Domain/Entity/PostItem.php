<?php 

namespace App\Domain\Entity;

class PostCreateItem
{

  public function __construct(protected string $name, protected string $description)
  {
    
  }

  public function setName(string $_name): void
  {
    $this->name = $_name;
  }

  public function getName(): string
  {
    return $this->name;
  }

  public function setDescription(string $_description): void
  {
    $this->description = $_description;
  }

  public function getDescription(): string
  {
    return $this->description;
  }
  
}