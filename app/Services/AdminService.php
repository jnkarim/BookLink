<?php

namespace App\Services;

use App\Models\User;
use App\Models\Book;
use Illuminate\Support\Facades\Hash;

class AdminService
{
    /**
     * Authenticate Admin
     */
    public function authenticateAdmin($email, $password)
    {
        $admin = User::where('email', $email)->where('role', 'admin')->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            return null;
        }

        return $admin;
    }

    /**
     * Get Pending Books
     */
    public function getPendingBooks()
    {
        return Book::where('status', 'pending')->get();
    }

    /**
     * Approve a Book
     */
    public function approveBook($id)
    {
        $book = Book::findOrFail($id);
        $book->update(['status' => 'approved']);
        return $book;
    }

    /**
     * Reject a Book
     */
    public function rejectBook($id)
    {
        $book = Book::findOrFail($id);
        $book->update(['status' => 'rejected']);
        return $book;
    }
}
