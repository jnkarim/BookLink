import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, ChevronDown, ArrowRight } from "lucide-react";

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch book details when the component mounts
    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get the token from storage
                const response = await fetch(
                    `http://127.0.0.1:8000/api/books/${id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch book details");
                }

                const data = await response.json();
                setBook(data); // Set the state with the fetched book details
            } catch (error) {
                setError(error.message); // Handle any errors
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id]); // Re-run if the `id` in the URL changes

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
        <div className="min-h-screen">
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
                    {/* Contact with the book owner link */}
                    <div className="mt-8">
                        <Link
                            to={`/user/${book.owner_id}`} // Link to User page with owner_id as a parameter
                            className="text-red-500 hover:underline font-semibold"
                        >
                            Contact with book owner
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
