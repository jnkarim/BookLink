import React, { useState, useEffect } from "react";
import { MdOutlineFileUpload } from "react-icons/md";
import axios from "axios";

const BookUpload = () => {
    const [bookTitle, setBookTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [genre, setGenre] = useState(""); // Added genre state
    const [description, setDescription] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authToken, setAuthToken] = useState(null);
    const [condition, setCondition] = useState("new");
    const [language, setLanguage] = useState("English");

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            setAuthToken(token);
        } else {
            console.error("No token found. User is not authenticated.");
        }
    }, []);

    const handleFileUpload = (e) => {
        const uploadedFile = e.target.files[0];
        if (uploadedFile) {
            setFile(uploadedFile);
            setPreview(URL.createObjectURL(uploadedFile));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!bookTitle || !author || !genre || !description || !file) {
            alert("Please fill all fields and upload a cover image.");
            return;
        }

        if (!authToken) {
            alert("You are not logged in. Please log in to upload a book.");
            return;
        }

        const formData = new FormData();
        formData.append("title", bookTitle);
        formData.append("author", author);
        formData.append("genre", genre); // Fixed this
        formData.append("description", description);
        formData.append("cover_image", file);
        formData.append("condition", condition);
        formData.append("language", language);

        try {
            setLoading(true);
            const response = await axios.post(
                "http://127.0.0.1:8000/api/books",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            console.log("Book uploaded:", response.data);
            alert("Book submitted successfully for admin approval!");

            setBookTitle("");
            setAuthor("");
            setGenre(""); // Reset genre
            setDescription("");
            setFile(null);
            setPreview(null);
            setCondition("new");
            setLanguage("English");
        } catch (error) {
            console.error(
                "Error uploading book:",
                error.response?.data || error.message
            );
            alert("Failed to upload book. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-row">
                    <div className="w-72 h-60 bg-[#f0eee2] rounded-xl flex items-center justify-center shadow-sm relative mx-32">
                        <input
                            type="file"
                            id="file-upload"
                            className="hidden"
                            onChange={handleFileUpload}
                        />
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer flex items-center justify-center w-full h-full "
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Book Cover Preview"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            ) : (
                                <MdOutlineFileUpload className="text-4xl text-gray-500" />
                            )}
                        </label>
                    </div>

                    <div className="flex justify-between w-full">
                        <div className="w-1/2">
                            <h3 className="font-bold text-gray-700 mb-2 text-3xl p-4 -mx-24">
                                Book Title
                            </h3>
                            <input
                                type="text"
                                placeholder="eg, Sherlock Holmes"
                                value={bookTitle}
                                onChange={(e) => setBookTitle(e.target.value)}
                                className="w-full border-b border-gray-200 bg-transparent outline-none px-4 -mx-24"
                                required
                            />
                        </div>

                        <div className="ml-auto">
                            <button
                                onClick={handleSubmit}
                                className="bg-black text-white px-8 py-3 mx-16 my-4 rounded-lg shadow disabled:opacity-50 hover:bg-red-500 transition duration-300 cursor-pointer"
                                disabled={loading}
                            >
                                {loading ? "Uploading..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-12">
                    <div className="max-w-[1050px] w-full h-auto mx-auto bg-white border border-gray-200 rounded-xl px-16 py-24 shadow-lg -mt-24">
                        <div className="w-full">
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-700 mb-2 text-xl mt-4">
                                    Author
                                </h3>
                                <input
                                    type="text"
                                    placeholder="Enter author's name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
                                    required
                                />
                            </div>
                            {/* Fixed Genre Section */}
                            <div className="mb-6">
                                <h3 className="font-bold text-gray-700 mb-2 text-xl">
                                    Genre
                                </h3>
                                <select
                                    value={genre}
                                    onChange={(e) => setGenre(e.target.value)}
                                    className="w-full p-3 my-2 border border-gray-300 rounded-lg bg-white"
                                    required
                                >
                                    <option value="" disabled>
                                        Select Genre
                                    </option>
                                    <option value="Fiction">Fiction</option>
                                    <option value="Non-fiction">
                                        Non-fiction
                                    </option>
                                    <option value="Romance">Romance</option>
                                    <option value="Detective">Detective</option>
                                    <option value="Adventure">Adventure</option>
                                    <option value="Thriller">Thriller</option>
                                    <option value="Horror">Horror</option>
                                </select>
                            </div>

                            <div className="mb-6">
                                <h3 className="font-bold text-gray-700 mb-2 text-xl">
                                    Description
                                </h3>
                                <textarea
                                    placeholder="Enter book description"
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    className="w-full h-20 p-2 border border-gray-300 rounded-lg bg-transparent outline-none"
                                    required
                                />
                            </div>

                            <div className="flex flex-row justify-between item-center gap-12 ">
                                <div className="w-1/2">
                                    <h3 className="font-bold text-gray-700 text-xl">
                                        Language
                                    </h3>
                                    <select
                                        value={language}
                                        onChange={(e) =>
                                            setLanguage(e.target.value)
                                        }
                                        className="w-full p-3 my-2 border border-gray-300 rounded-lg bg-white"
                                    >
                                        <option value="English">English</option>
                                        <option value="Bangla">Bangla</option>
                                    </select>
                                </div>

                                <div className="w-1/2">
                                    <h3 className="font-bold text-gray-700 text-xl">
                                        Condition
                                    </h3>
                                    <select
                                        value={condition}
                                        onChange={(e) =>
                                            setCondition(e.target.value)
                                        }
                                        className="w-full p-3 my-2 border border-gray-300 rounded-lg bg-white"
                                    >
                                        <option value="new">New</option>
                                        <option value="old">Old</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default BookUpload;
