<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

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
                'password' => bcrypt($request->password)  // Encrypting the password
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

    

}
