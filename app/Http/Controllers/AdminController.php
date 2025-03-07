<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AdminService;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    /**
     * Admin Login
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        $admin = $this->adminService->authenticateAdmin($request->email, $request->password);

        if (!$admin) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'message' => 'Admin login successful',
            'token' => $token,
            'user' => $admin
        ]);
    }

    /**
     * Get all pending books
     */
    public function pendingBooks()
    {
        return response()->json($this->adminService->getPendingBooks());
    }

    /**
     * Approve a book
     */
    public function approveBook($id)
    {
        $book = $this->adminService->approveBook($id);
        return response()->json(['message' => 'Book approved successfully', 'book' => $book]);
    }

    /**
     * Reject a book
     */
    public function rejectBook($id)
    {
        $book = $this->adminService->rejectBook($id);
        return response()->json(['message' => 'Book rejected successfully', 'book' => $book]);
    }
}
