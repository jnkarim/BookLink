import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineFileUpload } from "react-icons/md";
import { useOutletContext } from "react-router-dom";

const Settings = () => {
    const { setLoading } = useOutletContext(); // Ensure setLoading is provided by the parent
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
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true); // Start loading
                const token = localStorage.getItem("authToken");
                if (!token) throw new Error("No auth token found"); // Handle missing token

                const response = await axios.get("http://127.0.0.1:8000/api/user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const profilePic = response.data.profile_picture
                    ? `http://127.0.0.1:8000/storage/${response.data.profile_picture}`
                    : null;

                setUser(response.data);
                setProfilePreview(profilePic);
            } catch (err) {
                setError("Failed to load user data");
            } finally {
                setLoading(false); // Stop loading
            }
        };
        fetchUserData();
    }, [setLoading]); // Removed unnecessary dependency on setLoading

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
        setLoading(true); // Start loading

        try {
            const token = localStorage.getItem("authToken");
            if (!token) throw new Error("No auth token found"); // Handle missing token

            await axios.put("http://127.0.0.1:8000/api/user/update", user, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (profileFile) {
                const formData = new FormData();
                formData.append("profile_picture", profileFile);

                const uploadResponse = await axios.post(
                    "http://127.0.0.1:8000/api/user/upload-profile-picture",
                    formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                setProfilePreview(uploadResponse.data.profile_picture);
            }

            alert("Your profile has been updated!");
        } catch (err) {
            setError("Failed to update profile");
        } finally {
            setLoading(false); // Stop loading
        }
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
                        {profilePreview ? (
                            <img
                                src={profilePreview}
                                alt="Profile Preview"
                                className="w-32 h-32 rounded-full object-cover border-4 border-gray-900 shadow-xl mb-4 bg-[#f0eee2]"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-xl mb-4 bg-[#f0eee2] flex items-center justify-center text-gray-500">
                                No Image
                            </div>
                        )}
                        <label className="absolute bottom-0 right-0 bg-gray-900 text-white p-2 rounded-full cursor-pointer hover:bg-red-500 transition duration-300">
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
                    {[
                        { label: "Name", name: "name", type: "text" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "Phone Number", name: "phone", type: "text" },
                        { label: "Address", name: "address", type: "text" },
                        { label: "Bio", name: "bio", type: "text" },
                        { label: "Password", name: "password", type: "password" },
                    ].map(({ label, name, type }) => (
                        <div key={name}>
                            <label className="block text-gray-600 text-lg font-medium mb-2">
                                {label}
                            </label>
                            <input
                                type={type}
                                name={name}
                                value={user[name]}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border-1 rounded-md border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                placeholder={`Enter your ${label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <button
                        type="submit"
                        className="w-full bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-red-500 transition duration-300 flex items-center justify-center gap-3"
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Settings;