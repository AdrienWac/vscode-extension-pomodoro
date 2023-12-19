<?php

namespace App\Application\Presenter;

use App\Domain\Presenter\PostCreateItemPresenter;

class PostCreateItemPresenterVue implements PostCreateItemPresenter
{

  protected $viewModel;

  /**
   * Transform object response from domain to object for Vue JS
   */
  public function present()
  {
    // Utilisation du ViewModelJson
  }

}