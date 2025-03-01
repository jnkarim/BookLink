<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminController;


// Public Authentication Routes
Route::post('/registeruser', [authController::class, 'register']);
Route::post('/login', [authController::class, 'loginuser']);

// Authenticated User Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [authController::class, 'getUserData']);
    Route::post('/logout', [authController::class, 'logout']);
    Route::put('/user/update', [authController::class, 'update']); // Changed PUT to PATCH
    Route::post('/user/upload-profile-picture', [authController::class, 'updateProfilePicture']);
    Route::get('/count-users', [AuthController::class, 'countUsers']);

});

// Admin Authentication Route (Public)
Route::post('/admin', [AdminController::class, 'login']);

// Admin-Only Routes (Requires Authentication & Admin Role)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard']);
    Route::get('/admin/pending-books', [AdminController::class, 'pendingBooks']);
    Route::post('/admin/approve-book/{id}', [AdminController::class, 'approveBook']);
    Route::post('/admin/reject-book/{id}', [AdminController::class, 'rejectBook']);
    Route::post('/admin/promote-user/{id}', [AdminController::class, 'promoteToAdmin']);
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

    Route::patch('books/{bookId}/status', [BookController::class, 'updateBookStatus']);

});
