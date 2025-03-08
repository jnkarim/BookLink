import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaUpload } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28F9D", "#FF4560", "#6A0572"];

const Profile = () => {
    const { loading, setLoading } = useOutletContext();
    const [user, setUser] = useState(null);
    const [error, setError] = useState("");
    const [genreData, setGenreData] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true);
                setError("");
                const token = localStorage.getItem("authToken");
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setUser(response.data);

                if (response.data.books) {
                    const genreCounts = {};

                    response.data.books
                        .filter((book) => book.status === "available") // ✅ Only available books
                        .forEach((book) => {
                            let genre = book.genre?.trim().toLowerCase().replace(/-/g, " "); // Normalize genre names
                            if (genre) {
                                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
                            }
                        });

                    const genreChartData = Object.keys(genreCounts).map((genre) => ({
                        name: genre.charAt(0).toUpperCase() + genre.slice(1), // Capitalize first letter
                        value: genreCounts[genre],
                    }));

                    setGenreData(genreChartData);
                }
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [setLoading]);

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
            </div>

            <div className="max-w-6xl mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src={
                                        user?.profile_picture
                                            ? `http://127.0.0.1:8000/storage/${user.profile_picture}`
                                            : "https://via.placeholder.com/150"
                                    }
                                    alt="Profile"
                                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-900 shadow-lg"
                                />
                                <p className="mt-6 text-xl font-semibold text-gray-900">
                                    {user?.name || "No Name Provided"}
                                </p>
                                <p className="text-sm text-gray-500">{user?.email || "No Email Provided"}</p>

                                <div className="mt-8 space-y-4 w-full">
                                    <Link
                                        to="/settings"
                                        className="flex items-center justify-center w-full bg-gray-900 hover:bg-red-500 text-white py-3 px-6 rounded-lg transition duration-300"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </Link>
                                    <Link
                                        to="/upload-book"
                                        className="flex items-center justify-center w-full bg-gray-900 hover:bg-red-500 text-white py-3 px-6 rounded-lg transition duration-300"
                                    >
                                        <FaUpload className="mr-2" />
                                        Upload Book
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-2">
                        {/* My Books Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">My Books</h2>

                            <div className="bg-gray-100 p-4 rounded-xl shadow-md mb-6 flex items-center justify-between">
                                <span className="text-lg font-medium text-gray-700">
                                    <strong>
                                        {user?.books?.filter((book) => book.status === "available").length || 0}
                                    </strong>{" "}
                                    Books Available
                                </span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {user?.books && user.books.length > 0 ? (
                                    user.books
                                        .filter((book) => book.status === "available") // ✅ Only available books
                                        .map((book) => (
                                            <div key={book.id} className="w-full max-w-xs mx-auto rounded-xl flex flex-col items-center justify-center">
                                                <img
                                                    src={
                                                        book.cover_image
                                                            ? `http://127.0.0.1:8000/storage/${book.cover_image}`
                                                            : "https://via.placeholder.com/150"
                                                    }
                                                    alt={book.title}
                                                    className="object-contain rounded-lg w-full h-64"
                                                />
                                                <Link
                                                    to={`/book/${book.id}`}
                                                    className="mt-4 text-xl font-bold text-gray-500 text-center underline hover:text-red-500"
                                                >
                                                    {book.title}
                                                </Link>
                                            </div>
                                        ))
                                ) : (
                                    <p className="text-red-500 w-full text-center">No available books found.</p>
                                )}
                            </div>
                        </div>

                        {/* Pie Chart for Genre Distribution */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Books by Genre</h2>
                            {genreData.length > 0 ? (
                                <div className="flex justify-center">
                                    <PieChart width={600} height={500}>
                                        <Pie
                                            data={genreData}
                                            cx="50%"
                                            cy="50%"
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={200} // ✅ Adjusted size
                                            innerRadius={80} // ✅ Improved visibility
                                            dataKey="value"
                                        >
                                            {genreData.map((_, index) => (
                                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center">No books available for genre distribution.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;