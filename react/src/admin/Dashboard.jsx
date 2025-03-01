import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen, RefreshCw } from "lucide-react";

const Dashboard = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("authToken");
                if (!token) {
                    console.log("Authentication token not found");
                    return;
                }

                const response = await axios.get("http://127.0.0.1:8000/api/books", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setBooks(response.data);
            } catch (error) {
                console.error("Error fetching books:", error.response || error.message);
                setError("Failed to fetch books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const availableBooks = books.filter((book) => book.status === "available").length;
    const pendingBooks = books.filter((book) => book.status === "pending").length;

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard</h2>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <BookOpen className="w-10 h-10 text-green-500" />
                    <span className="text-lg font-medium text-gray-700">
                        <strong>{availableBooks}</strong> Books Available
                    </span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <BookOpen className="w-10 h-10 text-yellow-500" />
                    <span className="text-lg font-medium text-gray-700">
                        <strong>{pendingBooks}</strong> Pending Books
                    </span>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-md flex items-center gap-4">
                    <RefreshCw className="w-10 h-10 text-blue-500" />
                    <span className="text-lg font-medium text-gray-700">
                        <strong>{pendingBooks}</strong> Pending Requests
                    </span>
                </div>
            </div>

            {/* Books Table */}
            <div className="max-w-6xl mx-auto bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Book List</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border border-gray-300 px-4 py-2">ID</th>
                                <th className="border border-gray-300 px-4 py-2">Title</th>
                                <th className="border border-gray-300 px-4 py-2">Author</th>
                                <th className="border border-gray-300 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <tr key={book.id} className="text-center">
                                        <td className="border border-gray-300 px-4 py-2">{book.id}</td>
                                        <td className="border border-gray-300 px-4 py-2">{book.title}</td>
                                        <td className="border border-gray-300 px-4 py-2">{book.author || "N/A"}</td>
                                        <td className="border border-gray-300 px-4 py-2">
                                            <span
                                                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                    book.status === "available"
                                                        ? "bg-green-200 text-green-700"
                                                        : book.status === "pending"
                                                        ? "bg-yellow-200 text-yellow-700"
                                                        : "bg-red-200 text-red-700"
                                                }`}
                                            >
                                                {book.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border border-gray-300 px-4 py-2 text-center text-gray-500">
                                        No books available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
