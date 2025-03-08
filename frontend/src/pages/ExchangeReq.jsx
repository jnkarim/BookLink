import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    // Fetch pending requests
    useEffect(() => {
        const fetchPendingRequests = async () => {
            try {
                const token = localStorage.getItem("authToken");
                console.log("Fetching pending requests...");

                const response = await fetch("http://127.0.0.1:8000/api/cart", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("API Response:", response);

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("API Error:", errorData);
                    throw new Error(
                        errorData.message || "Failed to fetch pending requests"
                    );
                }

                const data = await response.json();
                console.log("Fetched Data:", data);

                setPendingRequests(data);
            } catch (error) {
                console.error("Error fetching pending requests:", error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPendingRequests();
    }, []);

    // Handle accepting a request
    const handleAccept = async (transactionId) => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch(
                `http://127.0.0.1:8000/api/transactions/${transactionId}/accept`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Failed to accept request");
            }

            // Remove the accepted request from the list
            setPendingRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== transactionId)
            );
            alert("Request accepted successfully!");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };
    // Handle rejecting a request
    const handleReject = async (transactionId) => {
        try {
            const token = localStorage.getItem("authToken");
            console.log("Rejecting request for transaction ID:", transactionId);

            const response = await fetch(
                `http://127.0.0.1:8000/api/transactions/${transactionId}/reject`,
                {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            console.log("Reject Response:", response);

            if (!response.ok) {
                const errorData = await response.json();
                console.error("Reject Error:", errorData);
                throw new Error(
                    errorData.message || "Failed to reject request"
                );
            }

            // Remove the rejected request from the list
            setPendingRequests((prevRequests) =>
                prevRequests.filter((request) => request.id !== transactionId)
            );
            console.log("Request rejected successfully!");
            alert("Request rejected successfully!");
        } catch (error) {
            console.error("Error rejecting request:", error);
            alert(`Error: ${error.message}`);
        }
    };

    // Redirect to user's profile
    const handleUserClick = (userId) => {
        navigate(`/user/${userId}`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md ml-0">
                {" "}
                {/* Aligned to the left corner */}
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    Book Requests
                </h1>
                {pendingRequests.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-gray-600 text-lg">
                            No book requests available.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pendingRequests.map((request) => (
                            <div
                                key={request.id}
                                className="bg-[#f0eee2] p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex flex-col space-y-4">
                                    <div className="flex items-start space-x-4">
                                        {/* Dot (•) */}
                                        <span className="text-gray-900 font-semibold text-5xl">
                                            •
                                        </span>
                                        {/* Book Title and Requester's Name */}
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-900 mt-3">
                                                {request.book.title}
                                            </h2>
                                            <p className="text-gray-600 mt-2 text-lg">
                                                Requested by:{" "}
                                                <span
                                                    onClick={() =>
                                                        handleUserClick(
                                                            request.sender.id
                                                        )
                                                    }
                                                    className="text-sky-500 underline hover:text-blue-700 cursor-pointer"
                                                >
                                                    {request.sender.name}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-gray-900 mb-4 text-lg">
                                            Do you want to accept?
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() =>
                                                    handleAccept(request.id)
                                                }
                                                className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                                            >
                                                Accept
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleReject(request.id)
                                                }
                                                className="flex-1 bg-white text-black px-4 py-2 rounded-lg hover:bg-red-500 transition-colors"
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;