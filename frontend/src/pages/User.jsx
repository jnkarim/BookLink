import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const User = () => {
    const { owner_id } = useParams(); // Get the owner_id from the URL
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user details when the component mounts
    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get the token from storage
                const response = await fetch(
                    `http://127.0.0.1:8000/api/users/${owner_id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user details");
                }

                const data = await response.json();

                // Only show the user if the role is "user"
                if (data.role !== "user") {
                    setError("This user does not have the correct role.");
                    return;
                }

                setUser(data); // Set the state with the fetched user details
            } catch (error) {
                setError(error.message); // Handle any errors
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [owner_id]); // Re-run if the `owner_id` in the URL changes

    // Redirect if there's an error or if the user is not found
    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (!user) {
        return <p className="text-red-500">User not found.</p>;
    }

    return (
        <div className="min-h-screen">
            <div className="max-w-[1050px] w-full h-auto mx-auto bg-[#f8f9fa] border border-gray-200 rounded-xl px-16 py-24 shadow-lg">
                <h3 className="font-bold text-gray-900 text-4xl">{user.name}</h3>
                <p className="text-xl text-gray-500">{user.email}</p>
                <p className="mt-4 text-lg">{user.contact_info}</p>
            </div>
        </div>
    );
};

export default User;
