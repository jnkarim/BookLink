<?php

namespace App\Services;

use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Validator;

class BookService
{
    // Store a new book
    public function storeBook($data, $file)
    {
        if (!Auth::check()) {
            return ['status' => 'false', 'message' => 'User not authenticated'];
        }

        $validator = Validator::make($data, [
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'description' => 'nullable|string|max:800',
            'cover_image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'language' => 'required|in:English,Bangla',
            'condition' => 'required|in:new,old',
            'genre' => 'required|string|max:20'
        ]);

        if ($validator->fails()) {
            return ['status' => 'false', 'data' => $validator->errors()];
        }

        $imagePath = $file->store('books', 'public');

        $book = Book::create([
            'title' => $data['title'],
            'author' => $data['author'],
            'description' => $data['description'],
            'cover_image' => $imagePath,
            'status' => 'pending',
            'language' => $data['language'],
            'condition' => $data['condition'],
            'genre' => $data['genre'],
            'user_id' => Auth::id(),
        ]);

        return ['status' => 'true', 'message' => 'Book submitted successfully.', 'book' => $book];
    }

    // Get all books
    public function getAllBooks()
    {
        return Book::all();
    }

    // Get a specific book by ID
    public function getBookById($id)
    {
        return Book::find($id);
    }

    // Update Book Status
    public function updateBookStatus($bookId, $status)
    {
        try {
            Log::info('Updating book status:', ['bookId' => $bookId, 'status' => $status]);

            $book = Book::find($bookId);

            if (!$book) {
                return ['status' => 'false', 'message' => 'Book not found'];
            }

            $validator = Validator::make(['status' => $status], [
                'status' => 'required|string|in:available,pending,unavailable',
            ]);

            if ($validator->fails()) {
                return ['status' => 'false', 'data' => $validator->errors()];
            }

            $book->status = $status;
            $book->save();

            return ['status' => 'true', 'message' => 'Book status updated successfully', 'book' => $book];
        } catch (\Exception $e) {
            Log::error('Error updating book status:', ['error' => $e->getMessage()]);
            return ['status' => 'false', 'message' => 'Error updating status', 'error' => $e->getMessage()];
        }
    }

    // Delete a book
    public function deleteBook($id)
    {
        $book = Book::find($id);
        if (!$book) {
            return ['status' => 'false', 'message' => 'Book not found'];
        }

        Storage::delete('public/' . $book->cover_image);
        $book->delete();

        return ['status' => 'true', 'message' => 'Book deleted successfully'];
    }

    // Get book statistics
    public function getBookStats()
    {
        return [
            'total_books' => Book::count(),
            'active_users' => User::where('status', 'active')->count(),
            'books_exchanged' => Book::where('status', 'exchanged')->count(),
            'pending_returns' => Book::where('status', 'pending')->count(),
        ];
    }

    // Get recent book activities
    public function getRecentActivities()
    {
        return Book::with('user')
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
    }

    // Get books with pending status
    public function getPendingBooks()
    {
        return Book::with('user')->where('status', 'pending')->get();
    }

    public function showBooks($id)
    {
        $book = Book::with('user')->find($id);

        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }

        return response()->json($book);
    }

}
