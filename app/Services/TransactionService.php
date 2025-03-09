<?php

namespace App\Services;

use App\Models\Book;
use App\Models\Transaction;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class TransactionService
{
    /**
     * Create a new transaction.
     *
     * @param array $data
     * @return \App\Models\Transaction
     * @throws \Exception
     */
    public function createTransaction($data)
    {
        try {
            $user = Auth::user();
            $book = Book::findOrFail($data['book_id']);

            // Prevent self-request
            if ($user->id === $book->user_id) {
                throw new \Exception('You cannot request your own book', 403);
            }

            // Check if book is available
            if ($book->status !== 'available') {
                throw new \Exception('This book is not available for exchange', 403);
            }

            // Check for existing pending request
            $existingTransaction = Transaction::where('sender_id', $user->id)
                ->where('book_id', $book->id)
                ->where('status', 'pending')
                ->first();

            if ($existingTransaction) {
                throw new \Exception('You already have a pending request for this book', 409);
            }

            // Create transaction
            return Transaction::create([
                'sender_id' => $user->id,
                'receiver_id' => $book->user_id,
                'book_id' => $book->id,
                'status' => 'pending',
            ]);
        } catch (\Exception $e) {
            Log::error('Transaction creation failed: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get pending requests for the logged-in user.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws \Exception
     */
    public function getPendingRequests()
    {
        try {
            $user = Auth::user();

            return Transaction::with(['sender', 'book'])
                ->where('receiver_id', $user->id)
                ->where('status', 'pending')
                ->get();
        } catch (\Exception $e) {
            Log::error('Failed to fetch pending requests: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Accept a transaction request.
     *
     * @param int $id
     * @return void
     * @throws \Exception
     */
    public function acceptRequest($id)
    {
        DB::beginTransaction();
        try {
            $transaction = Transaction::with('book')->findOrFail($id);

            // Validate transaction status
            if ($transaction->status !== 'pending') {
                throw new \Exception('Transaction is not in a state that can be accepted', 400);
            }

            // Update transaction status
            $transaction->status = 'exchanged';
            $transaction->save();

            // Update book status
            $book = $transaction->book;
            $book->status = 'exchanged';
            $book->save();

            DB::commit();
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Failed to accept request: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Reject a transaction request.
     *
     * @param int $id
     * @return void
     * @throws \Exception
     */
    public function rejectRequest($id)
    {
        try {
            $transaction = Transaction::findOrFail($id);
            $transaction->status = 'rejected';
            $transaction->save();
        } catch (\Exception $e) {
            Log::error('Failed to reject request: ' . $e->getMessage());
            throw $e;
        }
    }

    /**
     * Get all transactions for the authenticated user.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws \Exception
     */
    public function getAllTransactions()
    {
        try {
            $user = Auth::user();

            return Transaction::with(['sender', 'receiver', 'book'])
                ->where('sender_id', $user->id)
                ->orWhere('receiver_id', $user->id)
                ->get();
        } catch (\Exception $e) {
            Log::error('Failed to fetch transactions: ' . $e->getMessage());
            throw $e;
        }
    }
}