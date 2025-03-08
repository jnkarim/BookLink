<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\DB;


class TransactionController extends Controller
{
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'book_id' => 'required|exists:books,id'
            ]);

            $user = Auth::user();
            $book = Book::findOrFail($validated['book_id']);

            // Prevent self-request
            if ($user->id === $book->user_id) {
                return response()->json([
                    'message' => 'You cannot request your own book'
                ], 403);
            }

            // Check if book is available
            if ($book->status !== 'available') {
                return response()->json([
                    'message' => 'This book is not available for exchange'
                ], 403);
            }

            // Check for existing pending request
            $existingTransaction = Transaction::where('sender_id', $user->id)
                ->where('book_id', $book->id)
                ->where('status', 'pending')
                ->first();

            if ($existingTransaction) {
                return response()->json([
                    'message' => 'You already have a pending request for this book'
                ], 409);
            }

            // Create transaction
            $transaction = Transaction::create([
                'sender_id' => $user->id,
                'receiver_id' => $book->user_id,
                'book_id' => $book->id,
                'status' => 'pending',
            ]);

            return response()->json($transaction, 201);
        } catch (\Exception $e) {
            // Log the error
            Log::error('Transaction creation failed: ' . $e->getMessage());

            return response()->json([
                'message' => 'An error occurred while processing your request'
            ], 500);
        }
    }

    public function getPendingRequests(Request $request)
    {
        try {
            $user = Auth::user();

            // Fetch all pending requests for the logged-in user (receiver)
            $pendingRequests = Transaction::with(['sender', 'book'])
                ->where('receiver_id', $user->id)
                ->where('status', 'pending')
                ->get();

            return response()->json($pendingRequests);
        } catch (\Exception $e) {
            Log::error('Failed to fetch pending requests: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to fetch pending requests'
            ], 500);
        }
    }

    public function acceptRequest($id)
    {
        DB::beginTransaction();
        try {
            $transaction = Transaction::with('book')->findOrFail($id);
    
            // Validate transaction status
            if ($transaction->status !== 'pending') {
                return response()->json([
                    'message' => 'Transaction is not in a state that can be accepted'
                ], 400);
            }
    
            // Update transaction status
            $transaction->status = 'exchanged';
            $transaction->save();
    
            // Update book status
            $book = $transaction->book;
            $book->status = 'exchanged';
            $book->save();
    
            DB::commit();
    
            return response()->json([
                'message' => 'Request accepted successfully'
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to accept request: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to accept request: ' . $e->getMessage()
            ], 500);
        }
    }

    // Reject a request
    public function rejectRequest($id)
    {
        try {
            $transaction = Transaction::findOrFail($id);
            $transaction->status = 'rejected';
            $transaction->save();

            return response()->json([
                'message' => 'Request rejected successfully'
            ]);
        } catch (\Exception $e) {
            Log::error('Failed to reject request: ' . $e->getMessage());
            return response()->json([
                'message' => 'Failed to reject request'
            ], 500);
        }
    }

    
}