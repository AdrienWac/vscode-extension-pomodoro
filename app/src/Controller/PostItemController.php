<?php

namespace App\Controller;

use App\Application\Controller\PostCreateItemInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class PostItemController extends AbstractController
{
    public function index(Request $request, PostCreateItemInterface $postCreateItemApplication): Response
    {
        $postItemCreateResponse = $postCreateItemApplication->create($request);
        // Transform  $postItemCreateResponse to Symfony Response
        return new Response;
    }
}
