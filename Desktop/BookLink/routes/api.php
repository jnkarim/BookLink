<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\authController;


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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/registeruser',[authController::class,'register']);
Route::post('/login',[authController::class,'loginuser']);
// Logout route
Route::post('/logout', [authController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->put('/user/update', [authController::class, 'update']);