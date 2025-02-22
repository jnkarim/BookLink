<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

use App\Services\PostService;

class authController extends Controller
{
    // Register Function
    public function register(Request $request)
    {
        // Validation
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone' => 'required|string|max:15', // phone number should be a string with max length
            'address' => 'required|string|max:255',
            'password' => 'required|string|min:6', // Ensure password has a minimum length
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
                'password' => Hash::make($request->password)  // Use Hash::make() for better clarity
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

        return response()->json([
            'status' => 'false',
            'message' => 'No authenticated user found!'
        ], 401);
    }

    // Update User Profile
    public function update(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'bio' => 'nullable|string|max:500',
            'phone' => 'nullable|string|max:15',  // Allow phone to be nullable for update
            'address' => 'nullable|string|max:255', // Allow address to be nullable for update
        ]);

        $user->update($request->only('name', 'email', 'bio', 'phone', 'address'));

        return response()->json(['message' => 'Profile updated successfully', 'user' => $user]);
    }

    public function getUserData(Request $request)
    {
        $user = $request->user(); // Get the authenticated user
        $user->load('books'); // Eager load the books relationship

        return response()->json($user); // Return user data as JSON
    }

    public function updateProfilePicture(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $user = auth()->user();

        if ($request->hasFile('profile_picture')) {
            // Store the image in public/uploads folder
            $imagePath = $request->file('profile_picture')->store('uploads', 'public');

            // Save the image path in the database
            $user->profile_picture = $imagePath;
            $user->save();
        }

        return response()->json(['message' => 'Profile picture updated successfully', 'profile_picture' => $user->profile_picture]);
    }

}
