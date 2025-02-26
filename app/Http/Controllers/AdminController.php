<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Book;

class AdminController extends Controller
{
    /**
     * Admin Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = User::where('email', $request->email)->where('role', 'admin')->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful',
            'token' => $token,
            'user' => $admin
        ]);
    }

    /**
     * Get all pending books
     */
    public function pendingBooks()
    {
        return response()->json(Book::where('status', 'pending')->get());
    }

    /**
     * Approve a book
     */
    public function approveBook($id)
    {
        $book = Book::findOrFail($id);
        $book->update(['status' => 'approved']);

        return response()->json(['message' => 'Book approved successfully']);
    }

    /**
     * Reject a book
     */
    public function rejectBook($id)
    {
        $book = Book::findOrFail($id);
        $book->update(['status' => 'rejected']);

        return response()->json(['message' => 'Book rejected successfully']);
    }
}
