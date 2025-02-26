import React, { useState, useEffect } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import axios from "axios";

const BookUpload = () => {
  const [bookTitle, setBookTitle] = useState("");
  const [author, setAuthor] = useState("");
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

    if (!bookTitle || !author || !description || !file) {
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
    formData.append("description", description);
    formData.append("cover_image", file);
    formData.append("condition", condition);
    formData.append("language", language);

    try {
      setLoading(true);
      const response = await axios.post("http://127.0.0.1:8000/api/books", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Book uploaded:", response.data);
      alert("Book submitted successfully!");

      setBookTitle("");
      setAuthor("");
      setDescription("");
      setFile(null);
      setPreview(null);
      setCondition("new");
      setLanguage("English");
    } catch (error) {
      console.error("Error uploading book:", error.response?.data || error.message);
      alert("Failed to upload book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefdfb] p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-700">Book Upload</h1>
        <button
          onClick={handleSubmit}
          className="bg-black text-white px-8 py-2 rounded shadow disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Save"}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-12">
          <div className="w-48 h-64 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm relative">
            <input type="file" id="file-upload" className="hidden" onChange={handleFileUpload} />
            <label htmlFor="file-upload" className="cursor-pointer flex items-center justify-center w-full h-full">
              {preview ? (
                <img src={preview} alt="Book Cover Preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <FaCloudUploadAlt className="text-4xl text-gray-500" />
              )}
            </label>
          </div>

          <div className="flex-1">
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Book Title</h3>
              <input
                type="text"
                placeholder="Enter book title"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Author</h3>
              <input
                type="text"
                placeholder="Enter author's name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Description</h3>
              <textarea
                placeholder="Enter book description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-transparent outline-none"
                required
              />
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Language</h3>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="English">English</option>
                <option value="Bangla">Bangla</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Condition</h3>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg bg-white"
              >
                <option value="new">New</option>
                <option value="old">Old</option>
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookUpload;