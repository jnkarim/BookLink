import React, { useState } from 'react';
import { FaCloudUploadAlt, FaUserCircle } from 'react-icons/fa';

const BookUpload = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genres, setGenres] = useState([]);
  const [translation, setTranslation] = useState('');
  const [tags, setTags] = useState([]);
  const [isbn, setIsbn] = useState('');
  const [file, setFile] = useState(null); // State to store the uploaded file

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ bookTitle, description, genres, translation, tags, isbn, file });
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0]; // Get the first file
    if (uploadedFile) {
      setFile(uploadedFile); // Store the file in state
      console.log('File uploaded:', uploadedFile.name);
    }
  };

  return (
    <div className="min-h-screen bg-[#fefdfb] p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold text-gray-700">Book Upload</h1>
        <div className="flex items-center gap-4">
          {/* Save Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-black text-white px-8 py-2 rounded shadow"
          >
            Save
          </button>
        </div>
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit}>
        <div className="flex gap-12">
          {/* Upload Section */}
          <div className="w-48 h-64 bg-gray-100 rounded-xl flex items-center justify-center shadow-sm">
            {/* Hidden file input */}
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileUpload}
            />
            {/* Upload Button */}
            <label htmlFor="file-upload" className="cursor-pointer">
              <FaCloudUploadAlt className="text-4xl text-gray-500" />
            </label>
          </div>

          {/* Form Fields */}
          <div className="flex-1">
            {/* Book Title */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Book Title</h3>
              <input
                placeholder="eg. Harry Potter"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
              />
            </div>

            {/* Genres */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Genres</h3>
              <button
                type="button"
                className="border px-3 py-1 rounded bg-gray-100"
              >
                +
              </button>
            </div>

            {/* Description */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Description</h3>
              <textarea
                placeholder="Description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg mb-2"
                maxLength="800"
              />
              <p className="text-gray-500 text-sm">{description.length} / 800</p>
            </div>

            {/* Translation */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Language</h3>
              <input
                placeholder="eg. English"
                value={translation}
                onChange={(e) => setTranslation(e.target.value)}
                className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
              />
            </div>

            {/* Tags */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">Tags</h3>
              <button
                type="button"
                className="border px-3 py-1 rounded bg-gray-100"
              >
                +
              </button>
            </div>

            {/* ISBN */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-700 mb-2">ISBN</h3>
              <input
                placeholder="Type here to search"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                className="w-full p-2 border-b border-gray-300 bg-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookUpload;