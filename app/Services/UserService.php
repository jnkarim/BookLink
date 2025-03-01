<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use Validator;

class UserService
{
    // Register a new user
    public function registerUser($data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return ['status' => 'false', 'data' => $validator->errors()];
        }

        $user = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'],
            'address' => $data['address'],
            'password' => Hash::make($data['password']),
            'role' => 'user'
        ]);

        return [
            'status' => 'true',
            'message' => 'User REGISTERED SUCCESSFULLY!',
            'token' => $user->createToken('register_token')->plainTextToken
        ];
    }

    // Login User
    public function loginUser($data)
    {
        $validator = Validator::make($data, [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return ['status' => 'false', 'message' => 'Some input data error!', 'data' => $validator->errors()];
        }

        if (Auth::attempt(['email' => $data['email'], 'password' => $data['password']])) {
            $user = Auth::user();
            return [
                'status' => 'true',
                'message' => 'USER LOGIN SUCCESSFULLY!',
                'role' => $user->role,
                'token' => $user->createToken('login_token')->plainTextToken
            ];
        }

        return ['status' => 'false', 'message' => 'AUTHENTICATION ERROR!'];
    }

    // Logout User
    public function logoutUser($user)
    {
        if ($user) {
            $user->tokens()->delete();
            return ['status' => 'true', 'message' => 'Successfully logged out, tokens revoked!'];
        }

        return ['status' => 'false', 'message' => 'No authenticated user found!', 'code' => 401];
    }

    // Update User Profile
    public function updateUserProfile($user, $data)
    {
        $validator = Validator::make($data, [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'bio' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return ['status' => 'false', 'data' => $validator->errors()];
        }

        $user->update($data);

        return ['status' => 'true', 'message' => 'Profile updated successfully', 'user' => $user];
    }

    // Get User Data
    public function getUserData($user)
    {
        if ($user->role === 'admin') {
            return User::with('books')->get();
        }

        $user->load('books');
        return $user;
    }

    // Count Users
    public function countUsers()
    {
        return ['status' => 'true', 'total_users' => User::count()];
    }

    // Update Profile Picture
    public function updateProfilePicture($user, $file)
    {
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        $imagePath = $file->store('uploads', 'public');
        $user->profile_picture = $imagePath;
        $user->save();

        return ['message' => 'Profile picture updated successfully', 'profile_picture' => $user->profile_picture];
    }
}
