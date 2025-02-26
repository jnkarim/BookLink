<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Storage;

class authController extends Controller
{
    // Register Function
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required',
            'address' => 'required',
            'password' => 'required|min:6', // Ensure password has a minimum length
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'false',
                'data' => $validator->errors()
            ]);
        } else {
            // Creating the user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
<<<<<<< HEAD
                'password' => bcrypt($request->password)  // Encrypting the password
=======
                'password' => Hash::make($request->password),  // Use Hash::make() for better clarity
                'role' => 'user'  // Default role set as "user"
>>>>>>> 6bc2dd6 (admin portion is fixed)
            ]);

            return response()->json([
                'status' => 'true',
                'message' => 'User REGISTERED SUCCESSFULLY!',
                'token' => $user->createToken('register_token')->plainTextToken
            ]);
        }
    }

    // Login Function
    public function loginuser(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'false',
                'message' => 'Some input data error!',
                'data' => $validator->errors()
            ]);
        } else {
            // Authenticate User
            if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
                $user = Auth::user();
                return response()->json([
                    'status' => 'true',
                    'message' => 'USER LOGIN SUCCESSFULLY!',
                    'role' => $user->role,  // Return user role
                    'token' => $user->createToken('login_token')->plainTextToken
                ]);

            } else {
                return response()->json([
                    'status' => 'false',
                    'message' => 'AUTHENTICATION ERROR!',
                ]);
            }
        }
    }

// Logout Function
public function logout(Request $request)
{
    // Get the authenticated user
    $user = $request->user();

    if ($user) {
        // Revoke all tokens issued to the user
        $user->tokens()->delete();

        return response()->json([
            'status' => 'true',
            'message' => 'Successfully logged out, tokens revoked!'
        ]);
    }

<<<<<<< HEAD
    return response()->json([
        'status' => 'false',
        'message' => 'No authenticated user found!'
    ], 401);
}

public function update(Request $request)
{
    $user = $request->user();

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
        'bio' => 'nullable|string|max:500',
    ]);
=======
    public function getUserData(Request $request)
    {
        $user = $request->user();

        // If user is admin, return all users
        if ($user->role === 'admin') {
            $users = User::with('books')->get();
            return response()->json($users);
        }

        // Else, return only the authenticated user's data
        $user->load('books');
        return response()->json($user);
    }


    public function countUsers()
    {
        // Count the total number of users in the 'users' table
        $totalUsers = User::count();

        return response()->json([
            'status' => 'true',
            'total_users' => $totalUsers
        ]);
    }


    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
>>>>>>> 6bc2dd6 (admin portion is fixed)

    $user->update($request->only('name', 'email', 'bio'));

<<<<<<< HEAD
    return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
}


    
=======
        // Delete old image if exists
        if ($user->profile_picture) {
            Storage::disk('public')->delete($user->profile_picture);
        }

        // Store the new image
        $imagePath = $request->file('profile_picture')->store('uploads', 'public');

        // Update user profile picture
        $user->profile_picture = $imagePath;
        $user->save();

        return response()->json(['message' => 'Profile picture updated successfully', 'profile_picture' => $user->profile_picture]);
    }
>>>>>>> 6bc2dd6 (admin portion is fixed)

}
