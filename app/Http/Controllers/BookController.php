<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class BookController extends Controller
{
    // Store a new book
    public function store(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['message' => 'User not authenticated'], 401);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string|max:500',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'language' => 'required|in:English,Bangla',
            'condition' => 'required|in:new,old',
            'genre' => 'required|string|max:20'
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
            'genre' => $request->genre,
            'user_id' => Auth::id(),
        ]);

        return response()->json(['message' => 'Book submitted successfully.', 'book' => $book], 201);
    }

    // Get all books
    public function index()
    {
        return response()->json(Book::all(), 200);
    }
    

    // Show a specific book
    public function show($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json($book);
    }

    // Update a book


    public function updateBookStatus($bookId, Request $request)
    {
        try {
            Log::info('Request Data:', $request->all()); // Log incoming request data

            // Find the book by ID
            $book = Book::find($bookId);

            if (!$book) {
                return response()->json(['message' => 'Book not found'], 404);
            }

            // Validate status input if necessary
            $request->validate([
                'status' => 'required|string|in:available,pending,unavailable', // Valid statuses
            ]);

            // Update the book status
            $book->status = $request->input('status');
            $book->save();

            return response()->json(['message' => 'Book status updated successfully', 'book' => $book], 200);
        } catch (\Exception $e) {
            Log::error('Error updating book status:', ['error' => $e->getMessage()]);
            return response()->json(['message' => 'Error updating status', 'error' => $e->getMessage()], 500);
        }
    }


    // Delete a book
    public function destroy($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        Storage::delete('public/' . $book->cover_image);
        $book->delete();

        return response()->json(['message' => 'Book deleted successfully']);
    }

    // Get book statistics
    public function getStats()
    {
        return response()->json([
            'total_books' => Book::count(),
            'active_users' => User::where('status', 'active')->count(),
            'books_exchanged' => Book::where('status', 'exchanged')->count(),
            'pending_returns' => Book::where('status', 'pending')->count(),
        ]);
    }

    // Get recent activities
    public function getRecentActivities()
    {
        $activities = Book::with('user')
            ->latest()
            ->take(5)
            ->get()
            ->map(function ($book) {
                return [
                    'bookId' => $book->id,
                    'action' => 'New book request',
                    'bookTitle' => $book->title,
                    'userName' => $book->user->name,
                    'date' => $book->created_at->format('Y-m-d'),
                ];
            });

        return response()->json($activities);
    }

    public function recentActivities()
    {
        $activities = Book::with('user')->where('status', 'pending')->get();

        return response()->json($activities);
    }

}
