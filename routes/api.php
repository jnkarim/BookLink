<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Models\User;
use Illuminate\Http\JsonResponse;


use App\Http\Controllers\ChatController;




// Public Authentication Routes
Route::post('/registeruser', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'loginuser']);

// Authenticated User Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUserData']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/update', [AuthController::class, 'update']); // Changed PUT to PATCH
    Route::post('/user/upload-profile-picture', [AuthController::class, 'updateProfilePicture']);
    Route::get('/count-users', [AuthController::class, 'countUsers']);
    Route::get('/transactions', [TransactionController::class, 'getAllTransactions']);

});

// Admin Authentication Route (Public)
Route::post('/admin', [AdminController::class, 'login']);

// Admin-Only Routes (Requires Authentication & Admin Role)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/pending-books', [AdminController::class, 'pendingBooks']);
    Route::post('/admin/approve-book/{id}', [AdminController::class, 'approveBook']);
    Route::post('/admin/reject-book/{id}', [AdminController::class, 'rejectBook']);
    Route::get('/admin/transactions', [TransactionController::class, 'getAllTransactions']);
});





Route::middleware('auth:sanctum')->group(function () {
    // Store a new book
    Route::post('/books', [BookController::class, 'store']);

    // Get all books
    Route::get('/books', [BookController::class, 'index']);

    // Show a specific book by ID
    Route::get('/books/{id}', [BookController::class, 'show']);


    // Update the status of a specific book by ID
    Route::patch('/books/{id}/status', [BookController::class, 'updateBookStatus']); // This method is not defined in the controller. You may want to add the logic for updating the status of a book.

    // Delete a specific book by ID
    Route::delete('/books/{id}', [BookController::class, 'destroy']);

    // Get recent book activities
    Route::get('/recent-activities', [BookController::class, 'recentActivities']);

    // Get statistics related to books and users
    Route::get('/stats', [BookController::class, 'getStats']);

});



Route::get('/users/{id}', function ($id): JsonResponse {
    $user = User::find($id);

    if (!$user) {
        return response()->json(['message' => 'User not found'], 404);
    }

    return response()->json($user);
});


Route::get('/users/{id}/books', [UserController::class, 'getUserBooks']);




Route::middleware('auth:sanctum')->group(function () {
    // ... other routes
    
    Route::post('/transactions', [TransactionController::class, 'store']);
});

Route::middleware('auth:sanctum')->group(function () {
    // Get pending requests for the logged-in user (book owner)
    Route::get('/cart', [TransactionController::class, 'getPendingRequests']);

    // Accept a request
    Route::put('/transactions/{id}/accept', [TransactionController::class, 'acceptRequest']);

    // Reject a request
    Route::put('/transactions/{id}/reject', [TransactionController::class, 'rejectRequest']);
});