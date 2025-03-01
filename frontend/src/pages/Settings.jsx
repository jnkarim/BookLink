import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaSave } from "react-icons/fa";

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
                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });
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

            alert("Your profile has been updated!");
        } catch (err) {
            setError("Failed to update profile");
        }
        setLoading(false);
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-6">
            <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-lg flex flex-col space-y-6">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
                    Account Settings
                </h2>

                {error && (
                    <div className="text-red-500 bg-red-100 p-4 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {/* Profile Picture */}
                <div className="flex flex-col items-center mb-6">
                    <div className="relative">
                        {profilePreview && (
                            <img
                                src={profilePreview}
                                alt="Profile Preview"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900 shadow-xl mb-4 bg-[#f0eee2]"
                            />
                        )}
                        <label className="absolute bottom-0 right-0 bg-gray-900  text-white p-2 rounded-full cursor-pointer hover:bg-red-500 transition duration-300">
                            <MdOutlineFileUpload size={20} />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleProfilePictureChange}
                                className="hidden"
                            />
                        </label>
                    </div>

                </div>

                {/* Form Fields */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={user.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 transition duration-300 bg-[#f0eee2]"
                            placeholder="Enter your name"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-[#f0eee2]"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Phone Number</label>
                        <input
                            type="text"
                            name="phone"
                            value={user.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-[#f0eee2]"
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={user.address}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-[#f0eee2]"
                            placeholder="Enter your address"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Bio</label>
                        <textarea
                            name="bio"
                            value={user.bio}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none h-24 bg-[#f0eee2]"
                            placeholder="Tell us about yourself"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-lg font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={user.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 border-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 bg-[#f0eee2]"
                            placeholder="Enter a new password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-red-500 transition duration-300 flex items-center justify-center gap-3"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : <><FaSave /> Save Changes</>}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;
