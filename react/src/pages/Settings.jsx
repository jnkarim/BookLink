import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUpload } from "react-icons/fa";

const Settings = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        bio: "",
        phone: "",
    });
    const [profilePreview, setProfilePreview] = useState(null);
    const [profileFile, setProfileFile] = useState(null);
    const [loading, setLoading] = useState(false);
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
                setProfilePreview(response.data.profile_picture);
            } catch (err) {
                setError("Failed to load user data");
            }
        };
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileFile(file);
            setProfilePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem("authToken");

            await axios.put("http://127.0.0.1:8000/api/user/update", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (profileFile) {
                const formData = new FormData();
                formData.append("profile_picture", profileFile);

                await axios.post(
                    "http://127.0.0.1:8000/api/user/upload-profile-picture",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
            }

            alert("Your profile updated successfully!");
        } catch (err) {
            setError("Failed to update profile");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center my-4 py-8">
            <div className="bg-[#fdfcf7] p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                    Settings
                </h2>
                {error && (
                    <p className="text-red-500 text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center">
                        {profilePreview && (
                            <img
                                src={profilePreview}
                                alt="Profile Preview"
                                className="w-24 h-24 rounded-full object-cover border mb-2"
                            />
                        )}
                        <label className="flex items-center justify-center w-full bg-gray-900 hover:bg-red-500 text-white py-2 rounded-lg transition duration-300 cursor-pointer">
                            <FaUpload className="mr-2" /> Upload Profile Pic
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter updated contact number"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter updated address"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-2 h-20 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 resize-none"
                            placeholder="Enter your bio"
                        />
                    </div>

                    <div>
                        <label className="block mb-1 text-gray-700 font-semibold">
                            Update Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter a new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-2 rounded-full hover:bg-red-500 transition duration-300 cursor-pointer"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
