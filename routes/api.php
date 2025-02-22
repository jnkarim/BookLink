<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;
use App\Http\Controllers\BookController;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentication Routes
Route::post('/registeruser', [authController::class, 'register']);
Route::post('/login', [authController::class, 'loginuser']);

// Protected Routes (Requires Authentication)
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [authController::class, 'logout']);
    Route::put('/user/update', [authController::class, 'update']);
    Route::get('/user', [authController::class, 'getUserData']);



    // **New Route for Profile Picture Upload**
    Route::post('/user/upload-profile-picture', [authController::class, 'updateProfilePicture']);
});

