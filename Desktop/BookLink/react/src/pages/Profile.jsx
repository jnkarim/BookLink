import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
    FaEdit,
    FaUpload,
    FaLinkedin,
    FaTwitter,
    FaFacebook,
    FaBook,
    FaStar,
    FaChartLine,
} from "react-icons/fa";

const Profile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/user",
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                setUser(response.data);
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading)
        return (
            <div className="text-center text-lg font-semibold">Loading...</div>
        );
    if (error)
        return (
            <div className="text-center text-sky-500 font-semibold">
                {error}
            </div>
        );

    return (
        <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
            {/* Page Header */}
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    Profile
                </h1>
            </div>

            {/* Profile Content */}
            <div className="max-w-6xl mx-auto mt-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Left Side: Profile Picture and Actions */}
                    <div className="col-span-1">
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <div className="flex flex-col items-center">
                                <img
                                    src="https://via.placeholder.com/150"
                                    alt=""
                                    className="w-40 h-40 rounded-full object-cover border-4 border-gray-900 shadow-lg"
                                />
                                <p className="mt-6 text-xl font-semibold text-gray-900">
                                    {user.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>

                                {/* Profile Progress Bar */}
                                <div className="w-full mt-6">
                                    <div className="flex justify-between text-sm font-medium text-gray-700">
                                        <span>Profile Completion</span>
                                        <span>70%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                                        <div
                                            className="bg-sky-500 h-2 rounded-full"
                                            style={{ width: "70%" }}
                                        ></div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="mt-8 space-y-4 w-full">
                                    <Link
                                        to="/settings"
                                        className="flex items-center justify-center w-full bg-gray-900 hover:bg-sky-500 text-white py-3 px-6 rounded-lg transition duration-300"
                                    >
                                        <FaEdit className="mr-2" />
                                        Edit Profile
                                    </Link>
                                    <Link
                                        to="/upload-book"
                                        className="flex items-center justify-center w-full bg-gray-900 hover:bg-sky-500 text-white py-3 px-6 rounded-lg transition duration-300"
                                    >
                                        <FaUpload className="mr-2" />
                                        Upload Book
                                    </Link>
                                </div>

                                {/* Social Media Links */}
                                <div className="mt-8">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                        Connect with Me
                                    </h3>
                                    <div className="flex space-x-4">
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-sky-500"
                                        >
                                            <FaLinkedin size={24} />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-sky-500"
                                        >
                                            <FaTwitter size={24} />
                                        </a>
                                        <a
                                            href="#"
                                            className="text-gray-600 hover:text-sky-500"
                                        >
                                            <FaFacebook size={24} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: User Details and Activity */}
                    <div className="col-span-2">
                        {/* About Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                About
                            </h2>
                            <p className="text-gray-600">
                                {user.bio || "No bio provided."}
                            </p>
                        </div>

                        {/* Statistics Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                                <FaBook
                                    className="text-sky-500 mr-4"
                                    size={32}
                                />
                                <div>
                                    <p className="text-gray-600">
                                        Books Uploaded
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        12
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                                <FaStar
                                    className="text-sky-500 mr-4"
                                    size={32}
                                />
                                <div>
                                    <p className="text-gray-600">
                                        Reviews Written
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        8
                                    </p>
                                </div>
                            </div>
                            <div className="bg-white rounded-xl shadow-lg p-6 flex items-center">
                                <FaChartLine
                                    className="text-sky-500 mr-4"
                                    size={32}
                                />
                                <div>
                                    <p className="text-gray-600">
                                        Profile Views
                                    </p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        1.2K
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity Section */}
                        <div className="bg-white rounded-xl shadow-lg p-6">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                                Recent Activity
                            </h2>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-gray-100 p-3 rounded-full">
                                        <FaBook
                                            className="text-sky-500"
                                            size={20}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-900">
                                            Uploaded a new book:{" "}
                                            <span className="font-semibold">
                                                "The Great Gatsby"
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            2 hours ago
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-gray-100 p-3 rounded-full">
                                        <FaStar
                                            className="text-sky-500"
                                            size={20}
                                        />
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-gray-900">
                                            Reviewed:{" "}
                                            <span className="font-semibold">
                                                "To Kill a Mockingbird"
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            1 day ago
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
