<?php 

namespace App\Domain\Entity;

class PostItem
{

  public function __construct(protected string $title, protected string $description)
  {
    
  }

  public function setTitle(string $_title): void
  {
    $this->title = $_title;
  }

  public function getTitle(): string
  {
    return $this->title;
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