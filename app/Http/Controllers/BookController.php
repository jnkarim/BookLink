<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\PostService;

class BookController extends Controller
{
    public function getUserBooks(Request $request)
    {
        return response()->json(PostService::getUserBooks($request->user()->id));
    }

    public function getBooksWithUsers()
    {
        return response()->json(PostService::getBooksWithUsers());
    }

    public function getAllBooksWithUsers()
    {
        return response()->json(PostService::getAllBooksWithUsers());
    }

    public function getAllUsersWithBooks()
    {
        return response()->json(PostService::getAllUsersWithBooks());
    }

    public function getUsersWithBookCount()
    {
        return response()->json(PostService::getUsersWithBookCount());
    }

    public function getUsersWithLatestBook()
    {
        return response()->json(PostService::getUsersWithLatestBook());
    }
}
