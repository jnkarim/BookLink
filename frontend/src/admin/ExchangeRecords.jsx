import React, { useState, useEffect } from "react";
import axios from "axios";

const ExchangeRecords = () => {
    const [transactions, setTransactions] = useState([]);
    const [users, setUsers] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    setError("Please log in to view transactions");
                    return;
                }

                // Fetch transactions
                const transactionsRes = await axios.get(
                    "http://127.0.0.1:8000/api/transactions",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const transactionsData = transactionsRes.data;
                setTransactions(transactionsData);

                // Extract unique user_ids (sender and receiver)
                const userIds = [
                    ...new Set([
                        ...transactionsData.map((transaction) => transaction.sender_id),
                        ...transactionsData.map((transaction) => transaction.receiver_id),
                    ]),
                ];

                // Fetch user details for each unique user_id
                const userRequests = userIds.map((id) =>
                    axios.get(`http://127.0.0.1:8000/api/users/${id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );

                const userResponses = await Promise.all(userRequests);
                const userData = {};
                userResponses.forEach((res) => {
                    userData[res.data.id] = res.data.name; // Assuming API returns `{ id, name }`
                });

                setUsers(userData);
            } catch (error) {
                console.error("Error fetching data:", error.response || error.message);
                setError("Failed to fetch transactions");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Exchange Records</h2>

            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">All Transactions</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Sender</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Receiver</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Book</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.length > 0 ? (
                                transactions.map((transaction) => (
                                    <tr key={transaction.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">{transaction.id}</td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">
                                            {users[transaction.sender_id] || "Unknown User"}
                                        </td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">
                                            {users[transaction.receiver_id] || "Unknown User"}
                                        </td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">
                                            {transaction.book ? transaction.book.title : "N/A"}
                                        </td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                    transaction.status === "exchanged"
                                                        ? "bg-green-100 text-green-700"
                                                        : transaction.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
                                        No transactions found
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ExchangeRecords;