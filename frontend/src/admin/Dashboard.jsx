import React, { useState, useEffect } from "react";
import axios from "axios";
import { BookOpen } from "lucide-react";
import { Pie } from "react-chartjs-2"; // Import Pie chart
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Import Chart.js components

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

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
                console.log("Fetched books:", response.data); // Log fetched books
            } catch (error) {
                console.error("Error fetching books:", error.response || error.message);
                setError("Failed to fetch books");
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    // Count books by status
    const availableBooks = books.filter((book) => book.status === "available").length;
    const pendingBooks = books.filter((book) => book.status === "pending").length;
    const exchangedBooks = books.filter((book) => book.status === "exchanged").length; // Count exchanged books

    console.log("Available books:", availableBooks); // Log available books count
    console.log("Pending books:", pendingBooks); // Log pending books count
    console.log("Exchanged books:", exchangedBooks); // Log exchanged books count

    // Count books by genre
    const genreCounts = books.reduce((acc, book) => {
        acc[book.genre] = (acc[book.genre] || 0) + 1;
        return acc;
    }, {});

    console.log("Genre counts:", genreCounts); // Log genre counts

    // Prepare data for the status pie chart
    const statusPieChartData = {
        labels: ["Available", "Pending", "Exchanged"], // Added "Exchanged" label
        datasets: [
            {
                label: "Book Status",
                data: [availableBooks, pendingBooks, exchangedBooks], // Added exchangedBooks count
                backgroundColor: ["#10B981", "#FBBF24", "#3B82F6"], // Green for available, Yellow for pending, Blue for exchanged
                hoverBackgroundColor: ["#10B981", "#FBBF24", "#3B82F6"],
            },
        ],
    };

    // Prepare data for the genre pie chart
    const genrePieChartData = {
        labels: Object.keys(genreCounts),
        datasets: [
            {
                label: "Books by Genre",
                data: Object.values(genreCounts),
                backgroundColor: [
                    "#FF6384", // Red
                    "#36A2EB", // Blue
                    "#FFCE56", // Yellow
                    "#4BC0C0", // Teal
                    "#9966FF", // Purple
                    "#FF9F40", // Orange
                    "#C9CBCF", // Gray
                ],
                hoverBackgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                    "#C9CBCF",
                ],
            },
        ],
    };

    // Chart.js options for smooth animations
    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom", // Place legend at the bottom
            },
        },
        animation: {
            duration: 1000, // Smooth animation duration
            easing: "easeInOutQuad", // Smooth easing function
        },
    };

    if (loading) return <div className="text-center text-lg font-semibold">Loading...</div>;
    if (error) return <div className="text-center text-red-500 font-semibold">{error}</div>;

    return (
        <div className="p-8 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Admin Dashboard</h2>

            {/* Dashboard Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-8">
                {/* Available Books Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 border border-gray-100">
                    <BookOpen className="w-10 h-10 text-green-500" />
                    <div>
                        <span className="text-lg font-medium text-gray-700">Available Books</span>
                        <p className="text-2xl font-bold text-gray-900">{availableBooks}</p>
                    </div>
                </div>

                {/* Pending Books Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 border border-gray-100">
                    <BookOpen className="w-10 h-10 text-yellow-500" />
                    <div>
                        <span className="text-lg font-medium text-gray-700">Pending Books</span>
                        <p className="text-2xl font-bold text-gray-900">{pendingBooks}</p>
                    </div>
                </div>

                {/* Exchanged Books Card */}
                <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center gap-4 border border-gray-100">
                    <BookOpen className="w-10 h-10 text-sky-500" />
                    <div>
                        <span className="text-lg font-medium text-gray-700">Exchanged Books</span>
                        <p className="text-2xl font-bold text-gray-900">{exchangedBooks}</p>
                    </div>
                </div>
            </div>

            {/* Pie Charts */}
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Book Distribution</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Status Pie Chart */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h4 className="text-xl font-semibold text-gray-700 mb-4">By Status</h4>
                        <div className="w-full h-64 flex justify-center items-center">
                            <Pie data={statusPieChartData} options={pieChartOptions} />
                        </div>
                    </div>

                    {/* Genre Pie Chart */}
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h4 className="text-xl font-semibold text-gray-700 mb-4">By Genre</h4>
                        <div className="w-full h-64 flex justify-center items-center">
                            <Pie data={genrePieChartData} options={pieChartOptions} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Books Table */}
            <div className="max-w-6xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                <h3 className="text-2xl font-semibold text-gray-800 mb-6">Book List</h3>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Title</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Author</th>
                                <th className="border border-gray-200 px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.length > 0 ? (
                                books.map((book) => (
                                    <tr key={book.id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">{book.id}</td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">{book.title}</td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm text-gray-700">{book.author || "N/A"}</td>
                                        <td className="border border-gray-200 px-6 py-4 text-sm">
                                            <span
                                                className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                                    book.status === "available"
                                                        ? "bg-green-100 text-green-700"
                                                        : book.status === "pending"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : book.status === "exchanged"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                            >
                                                {book.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="border border-gray-200 px-6 py-4 text-center text-sm text-gray-500">
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