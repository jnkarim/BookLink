import React, { useEffect, useState } from "react";

const ExchangeRequestsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all pending exchange requests for the logged-in user
    useEffect(() => {
        const fetchExchangeRequests = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/transactions", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch exchange requests");
                }

                const data = await response.json();
                // Filter transactions where the logged-in user is the receiver and status is pending
                const pendingRequests = data.filter(
                    (transaction) =>
                        transaction.receiver_id === loggedInUserId && transaction.status === "pending"
                );
                setTransactions(pendingRequests);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchExchangeRequests();
    }, []);

    // Handle accept or reject
    const handleResponse = async (transactionId, status) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://127.0.0.1:8000/api/exchange-request/${transactionId}/respond`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ status }), // "accepted" or "rejected"
                }
            );

            if (!response.ok) {
                throw new Error("Failed to respond to exchange request");
            }

            // Update the transaction status in the UI
            setTransactions((prevTransactions) =>
                prevTransactions.map((transaction) =>
                    transaction.id === transactionId
                        ? { ...transaction, status: status }
                        : transaction
                )
            );

            alert(`Exchange request ${status}`);
        } catch (error) {
            setError(error.message);
        }
    };

    if (loading) {
        return <p>Loading exchange requests...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen mt-8 p-8">
            <h1 className="text-2xl font-bold mb-8">Pending Exchange Requests</h1>
            {transactions.length === 0 ? (
                <p>No pending exchange requests.</p>
            ) : (
                <div className="space-y-6">
                    {transactions.map((transaction) => (
                        <div
                            key={transaction.id}
                            className="p-6 bg-white rounded-lg shadow-md"
                        >
                            <h2 className="text-xl font-semibold">
                                Book: {transaction.book.title}
                            </h2>
                            <p className="text-gray-600">
                                Requester: {transaction.sender.name}
                            </p>
                            <p className="text-gray-600">
                                Status:{" "}
                                <span
                                    className={`font-semibold ${
                                        transaction.status === "pending"
                                            ? "text-yellow-600"
                                            : transaction.status === "accepted"
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {transaction.status}
                                </span>
                            </p>
                            <div className="mt-4 space-x-4">
                                {transaction.status === "pending" && (
                                    <>
                                        <button
                                            onClick={() =>
                                                handleResponse(transaction.id, "accepted")
                                            }
                                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                                        >
                                            Accept
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleResponse(transaction.id, "rejected")
                                            }
                                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExchangeRequestsPage;