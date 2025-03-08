<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\UserService;

class AuthController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    // Register Function
    public function register(Request $request)
    {
        $response = $this->userService->registerUser($request->all());
        return response()->json($response);
    }

    // Login Function
    public function loginuser(Request $request)
    {
        $response = $this->userService->loginUser($request->all());
        return response()->json($response);
    }

    // Logout Function
    public function logout(Request $request)
    {
        $response = $this->userService->logoutUser($request->user());
        return response()->json($response, $response['code'] ?? 200);
    }

    // Update User Profile
    public function update(Request $request)
    {
        $response = $this->userService->updateUserProfile($request->user(), $request->all());
        return response()->json($response);
    }

    // Get User Data
    public function getUserData(Request $request)
    {
        return response()->json($this->userService->getUserData($request->user()));
    }

    // Count Users
    public function countUsers()
    {
        return response()->json($this->userService->countUsers());
    }

    // Update Profile Picture
    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $response = $this->userService->updateProfilePicture($request->user(), $request->file('profile_picture'));
        return response()->json($response);
    }
}
