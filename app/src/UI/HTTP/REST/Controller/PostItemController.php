<?php

namespace App\UI\HTTP\Web\Controller;

use App\Application\Controller\CreateItemInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PostItemController extends AbstractController
{
    public function index(Request $request): Response
    {
        // $postItemCreateResponse = $postCreateItemApplication->create($request);
        // Transform  $postItemCreateResponse to Symfony Response
        return new Response;
    }
}
