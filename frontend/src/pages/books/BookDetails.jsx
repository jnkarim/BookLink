import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowRight, Send, Clock } from "lucide-react"; // Import icons

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loggedInUserId, setLoggedInUserId] = useState(null); // State to store logged-in user ID
    const [requestSent, setRequestSent] = useState(false); // State to track if request is sent

    // Fetch book details and logged-in user ID when the component mounts
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get the token from storage
                const [bookResponse, userResponse] = await Promise.all([
                    fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                    fetch("http://127.0.0.1:8000/api/user", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }),
                ]);

                if (!bookResponse.ok || !userResponse.ok) {
                    throw new Error("Failed to fetch data");
                }

                const bookData = await bookResponse.json();
                const userData = await userResponse.json();

                setBook(bookData); // Set the state with the fetched book details
                setLoggedInUserId(userData.id); // Set the logged-in user's ID

                // Check for existing pending request
                const transactionCheck = await fetch(
                    `http://127.0.0.1:8000/api/transactions?book_id=${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (transactionCheck.ok) {
                    const transactions = await transactionCheck.json();
                    setRequestSent(
                        transactions.some(
                            (t) => t.sender_id === userData.id && t.status === "pending"
                        )
                    );
                }
            } catch (error) {
                setError(error.message); // Handle any errors
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchBookDetails();
    }, [id]); // Re-run if the id in the URL changes

    const handleSendRequest = async () => {
        try {
            const token = localStorage.getItem("authToken");
            const response = await fetch("http://127.0.0.1:8000/api/transactions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ book_id: id }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to send request");
            }

            setRequestSent(true);
            alert("Exchange request sent successfully!");
        } catch (error) {
            alert(error.message);
        }
    };

    // Show loading spinner or error message
    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    // Show book details once data is fetched
    if (!book) {
        return <p className="text-red-500">Book not found.</p>;
    }

    return (
        <div className="min-h-screen mt-8">
            <div className="flex flex-row">
                {/* Book cover */}
                <div className="w-72 h-auto bg-[#f0eee2] rounded-xl flex items-center justify-center shadow-sm relative mx-32 ">
                    <img
                        src={
                            book.cover_image
                                ? `http://127.0.0.1:8000/storage/${book.cover_image}`
                                : "https://via.placeholder.com/150"
                        }
                        alt={book.title}
                        className="object-cover rounded-lg w-full h-full"
                    />
                </div>

                {/* Book details */}
                <div className="flex justify-between w-full">
                    <div className="w-1/2">
                        <h3 className="font-bold text-gray-900 text-4xl p-3 -mx-24">
                            {book.title}
                        </h3>
                        <p className="w-full text-2xl text-gray-500 px-4 -mx-24">
                            By {book.author}
                        </p>
                        <p className="w-fit text-lg font-semibold rounded-full text-gray-700 border border-black -mx-20 px-4 py-2 my-4">
                            {book.status}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-12">
                <div className="max-w-[1050px] w-full h-auto mx-auto bg-[#f8f9fa] border border-gray-200 rounded-xl px-16 py-24 shadow-lg -my-18">
                    <h2 className="text-xl font-bold mb-4">Genre</h2>
                    <p className="w-fit text-lg font-semibold rounded-2xl text-black border border-black px-4 py-2 my-4">
                        {book.genre}
                    </p>

                    <div className="mb-8">
                        <h2 className="text-xl font-bold mb-4">Description</h2>
                        <p className="text-gray-700">{book.description}</p>
                    </div>

                    {/* Contact with the book owner link and buttons */}
                    {loggedInUserId !== book.user_id && (
                        <div className="mt-8 flex flex-col gap-4 w-1/3">
                            {/* Contact with book owner button */}
                            <Link
                                to={`/user/${book.user_id}`} 
                                className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors"
                            >
                                <span>See book owner&aposs info</span>
                                <ArrowRight className="ml-2" size={20} />
                            </Link>

                            {/* Send Exchange Request button */}
                            {book.status === "available" && !requestSent && (
                                <button
                                    onClick={handleSendRequest}
                                    className="inline-flex items-center justify-center px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-sky-500 transition-colors"
                                >
                                    <span>Send Exchange Request</span>
                                    <Send className="ml-2" size={20} />
                                </button>
                            )}

                            {/* Request Pending button */}
                            {requestSent && (
                                <button
                                    disabled
                                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg cursor-not-allowed"
                                >
                                    <span>Request Pending</span>
                                    <Clock className="ml-2" size={20} />
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BookDetails;