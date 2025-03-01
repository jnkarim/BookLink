<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BookService;

class BookController extends Controller
{
    protected $bookService;

    public function __construct(BookService $bookService)
    {
        $this->bookService = $bookService;
    }

    // Store a new book
    public function store(Request $request)
    {
        $response = $this->bookService->storeBook($request->all(), $request->file('cover_image'));
        return response()->json($response, $response['status'] === 'true' ? 201 : 400);
    }

    // Get all books
    public function index()
    {
        return response()->json($this->bookService->getAllBooks(), 200);
    }

    // Show a specific book
    public function show($id)
    {
        $book = $this->bookService->getBookById($id);
        if (!$book) {
            return response()->json(['message' => 'Book not found'], 404);
        }
        return response()->json($book);
    }

    // Update Book Status
    public function updateBookStatus(Request $request, $bookId)
    {
        $request->validate([
            'status' => 'required|string|in:available,pending,unavailable',
        ]);

        $response = $this->bookService->updateBookStatus($bookId, $request->input('status'));
        return response()->json($response, $response['status'] === 'true' ? 200 : 400);
    }

    // Delete a book
    public function destroy($id)
    {
        $response = $this->bookService->deleteBook($id);
        return response()->json($response, $response['status'] === 'true' ? 200 : 404);
    }

    // Get book statistics
    public function getStats()
    {
        return response()->json($this->bookService->getBookStats(), 200);
    }

    // Get recent activities
    public function getRecentActivities()
    {
        return response()->json($this->bookService->getRecentActivities(), 200);
    }

    // Get books with pending status
    public function recentActivities()
    {
        return response()->json($this->bookService->getPendingBooks(), 200);
    }
}
