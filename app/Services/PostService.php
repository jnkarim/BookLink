<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PostService
{
    
    public static function getUserBooks($userId)
    {
        return DB::select('
            SELECT books.* 
            FROM books 
            WHERE books.user_id = ?', [$userId]
        );
    }

  
    public static function getBooksWithUsers()
    {
        return DB::select('
            SELECT books.id, books.title, books.author, books.description, books.cover_image, books.status, 
                   users.id as user_id, users.name as user_name, users.email
            FROM books
            INNER JOIN users ON books.user_id = users.id
        ');
    }


    public static function getAllBooksWithUsers()
    {
        return DB::select('
            SELECT books.id, books.title, books.author, books.description, books.cover_image, books.status, 
                   users.id as user_id, users.name as user_name, users.email
            FROM books
            LEFT JOIN users ON books.user_id = users.id
        ');
    }


    public static function getAllUsersWithBooks()
    {
        return DB::select('
            SELECT books.id as book_id, books.title, books.author, books.description, books.cover_image, books.status, 
                   users.id as user_id, users.name as user_name, users.email
            FROM books
            RIGHT JOIN users ON books.user_id = users.id
        ');
    }


    public static function getUsersWithBookCount()
    {
        return DB::select('
            SELECT users.id as user_id, users.name as user_name, users.email, 
                   COUNT(books.id) as total_books
            FROM users
            LEFT JOIN books ON users.id = books.user_id
            GROUP BY users.id, users.name, users.email
        ');
    }

    public static function getUsersWithLatestBook()
    {
        return DB::select('
            SELECT users.id as user_id, users.name as user_name, users.email, 
                   books.id as book_id, books.title, books.author, books.cover_image
            FROM users
            LEFT JOIN books ON users.id = books.user_id
            WHERE books.id = (
                SELECT MAX(b.id) FROM books b WHERE b.user_id = users.id
            )
        ');
    }
}
