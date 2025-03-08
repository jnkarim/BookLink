<?php

namespace App\Http\Controllers;

use App\Services\TransactionService;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'book_id' => 'required|exists:books,id'
            ]);

            $transaction = $this->transactionService->createTransaction($validated);

            return response()->json($transaction, 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function getPendingRequests(Request $request)
    {
        try {
            $pendingRequests = $this->transactionService->getPendingRequests();

            return response()->json($pendingRequests);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function acceptRequest($id)
    {
        try {
            $this->transactionService->acceptRequest($id);

            return response()->json([
                'message' => 'Request accepted successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function rejectRequest($id)
    {
        try {
            $this->transactionService->rejectRequest($id);

            return response()->json([
                'message' => 'Request rejected successfully'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }

    public function getAllTransactions()
    {
        try {
            $transactions = $this->transactionService->getAllTransactions();

            return response()->json($transactions);
        } catch (\Exception $e) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        }
    }
}