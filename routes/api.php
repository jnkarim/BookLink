<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
<<<<<<< HEAD


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
=======
use App\Http\Controllers\BookController;
use App\Http\Controllers\AdminController;
>>>>>>> 6bc2dd6 (admin portion is fixed)


<<<<<<< HEAD
Route::post('/registeruser',[authController::class,'register']);
Route::post('/login',[authController::class,'loginuser']);
// Logout route
Route::post('/logout', [authController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->put('/user/update', [authController::class, 'update']);
=======
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
Route::post('/admin/login', [AdminController::class, 'login']);

// Admin-Only Routes (Requires Authentication & Admin Role)
Route::middleware(['auth:sanctum', 'admin'])->group(function () {
    Route::get('/admin', [AdminController::class, 'dashboard']);
    Route::get('/admin/pending-books', [AdminController::class, 'pendingBooks']);
    Route::post('/admin/approve-book/{id}', [AdminController::class, 'approveBook']);
    Route::post('/admin/reject-book/{id}', [AdminController::class, 'rejectBook']);
    Route::post('/admin/promote-user/{id}', [AdminController::class, 'promoteToAdmin']);
});


Route::middleware('auth:sanctum')->group(function () {
    Route::post('/books', [BookController::class, 'store']);
    Route::get('/book-stats', [BookController::class, 'getStats']);
    Route::get('/recent-activities', [BookController::class, 'getRecentActivities']);
});



Route::middleware('auth:sanctum')->get('/books/pending', [BookController::class, 'index']);
>>>>>>> 6bc2dd6 (admin portion is fixed)
