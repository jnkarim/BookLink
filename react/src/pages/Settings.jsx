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
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
                    Account Settings
                </h2>
                {error && (
                    <div className="text-red-500 bg-red-100 p-3 rounded-md text-center mb-4">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="flex flex-col items-center">
                        {profilePreview && (
                            <img
                                src={profilePreview}
                                alt=""
                                className="w-28 h-28 rounded-full object-cover border mb-2"
                            />
                        )}
                        <label className="flex items-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-md hover:bg-gray-800 transition cursor-pointer">
                            <FaUpload />
                            Upload Profile Picture
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Contact Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter contact number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter address"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Bio
                        </label>
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900 resize-none h-24"
                            placeholder="Write something about yourself"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">
                            Update Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:ring-2 focus:ring-gray-900"
                            placeholder="Enter a new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-md font-medium hover:bg-gray-800 transition disabled:bg-gray-600"
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
