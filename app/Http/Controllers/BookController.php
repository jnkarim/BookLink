<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class BookController extends Controller
{
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'language' => 'required|in:English,Bangla',
            'condition' => 'required|in:new,old',
        ]);

        $imagePath = $request->file('cover_image')->store('books', 'public');

        $book = Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'description' => $request->description,
            'cover_image' => $imagePath,
            'status' => 'pending',
            'language' => $request->language,
            'condition' => $request->condition,
            'user_id' => Auth::id(),
        ]);

        return response()->json([
            'message' => 'Book submitted for review.',
            'book' => $book
        ], 201);
    }


    public function getStats()
    {
        $totalBooks = Book::count();
        $activeUsers = User::where('status', 'active')->count();
        $booksExchanged = Book::where('status', 'exchanged')->count();
        $pendingReturns = Book::where('status', 'pending')->count();

        return response()->json([
            'total_books' => $totalBooks,
            'active_users' => $activeUsers,
            'books_exchanged' => $booksExchanged,
            'pending_returns' => $pendingReturns,
        ]);
    }

    public function getRecentActivities()
    {
        $activities = Book::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($book) {
                return [
                    'action' => 'New book request',
                    'bookTitle' => $book->title,
                    'userName' => $book->user->name,
                    'date' => $book->created_at->format('Y-m-d'),
                ];
            });

        return response()->json($activities);
    }

    public function index()
    {
        return response()->json(Book::where('available_status', 'pending')->get());
    }

}
