import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingBooks = () => {
    const [pendingActivities, setPendingActivities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.log("Authentication token not found");
                    return;
                }

                const activitiesRes = await axios.get(
                    "http://127.0.0.1:8000/api/recent-activities",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                setPendingActivities(activitiesRes.data);
            } catch (error) {
                console.error("Error fetching data:", error.response || error.message);
            }
        };

        fetchData();
    }, []);

    const handleStatusChange = async (bookId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("Authentication token not found");
            return;
        }
    
        try {
            await axios.patch(
                `http://127.0.0.1:8000/api/books/${bookId}/status`,
                { status: "available" },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            // Remove the approved book from the list
            setPendingActivities((prevActivities) =>
                prevActivities.filter((activity) => activity.id !== bookId)
            );
        } catch (error) {
            console.error("Error updating status:", error.response || error.message);
        }
    };
    

    const handleRejectAndDelete = async (bookId) => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.log("Authentication token not found");
            return;
        }

        try {
            await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setPendingActivities((prevActivities) =>
                prevActivities.filter((activity) => activity.id !== bookId)
            );
            console.log("Book rejected and deleted from the database");
        } catch (error) {
            console.error("Error deleting the book:", error.response || error.message);
        }
    };

    return (
        <div className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
            <div className="max-w-5xl w-full">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pending Book Approvals</h2>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="p-4">
                        {pendingActivities.length === 0 ? (
                            <p className="text-center text-gray-500">No pending approvals.</p>
                        ) : (
                            <div className="space-y-4">
                                {pendingActivities.map((activity) => (
                                    <div key={activity.id} className="p-4 bg-gray-100 rounded-md flex items-center gap-6">
                                        <img
                                            src={activity.cover_image ? `http://127.0.0.1:8000/storage/${activity.cover_image}` : "https://via.placeholder.com/150"}
                                            alt={activity.title}
                                            className="w-20 h-28 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold">{activity.title}</h3>
                                            <p className="text-sm text-gray-500">Author: {activity.author}</p>
                                            <p className="text-sm text-gray-500">Genre: {activity.genre}</p>
                                            <p className="text-sm text-gray-500">Condition: {activity.condition}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                                                onClick={() => handleStatusChange(activity.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
                                                onClick={() => handleRejectAndDelete(activity.id)}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PendingBooks;
