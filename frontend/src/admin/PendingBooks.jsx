import React, { useState, useEffect } from "react";
import axios from "axios";

const PendingBooks = () => {
    const [pendingActivities, setPendingActivities] = useState([]);
    const [users, setUsers] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.log("Authentication token not found");
                    return;
                }

                // Fetch pending book activities
                const activitiesRes = await axios.get(
                    "http://127.0.0.1:8000/api/recent-activities",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                const activities = activitiesRes.data;
                setPendingActivities(activities);

                // Extract unique user_ids
                const userIds = [...new Set(activities.map((activity) => activity.user_id))];

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
        <div className="p-8 min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                    Pending Book Approvals
                </h2>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="p-6">
                        {pendingActivities.length === 0 ? (
                            <p className="text-center text-gray-500">No pending approvals.</p>
                        ) : (
                            <div className="space-y-6">
                                {pendingActivities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="p-6 bg-gray-50 rounded-lg flex flex-col md:flex-row items-start md:items-center gap-6 border border-gray-200"
                                    >
                                        <img
                                            src={
                                                activity.cover_image
                                                    ? `http://127.0.0.1:8000/storage/${activity.cover_image}`
                                                    : "https://via.placeholder.com/150"
                                            }
                                            alt={activity.title}
                                            className="w-24 h-32 object-cover rounded-lg shadow-sm"
                                        />
                                        <div className="flex-1 space-y-2">
                                            <h3 className="text-xl font-semibold text-gray-800">{activity.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                <strong>Author:</strong> {activity.author}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Genre:</strong> {activity.genre}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Condition:</strong> {activity.condition}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Uploaded By:</strong> {users[activity.user_id] || "Unknown User"}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                <strong>Uploaded On:</strong> {new Date(activity.created_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <button
                                                className="bg-gray-900 text-white px-5 py-2 rounded-md hover:bg-sky-600 transition duration-200 ease-in-out transform hover:scale-105"
                                                onClick={() => handleStatusChange(activity.id)}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                className="bg-red-500 text-white px-5 py-2 rounded-md hover:bg-red-600 transition duration-200 ease-in-out transform hover:scale-105"
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