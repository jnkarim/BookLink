import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Explore = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1); // Track current page
    const booksPerPage = 6; // Number of books per page
    const [searchQuery, setSearchQuery] = useState(""); // Search query state

    // Fetch book data from the API
    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const token = localStorage.getItem("authToken"); // Get the auth token
                const response = await fetch(
                    "http://127.0.0.1:8000/api/books",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Pass the token for authentication
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data = await response.json();
                // Filter only available books and set categories
                const availableBooks = data.filter(
                    (book) => book.status === "available"
                );
                setBooks(availableBooks);
                setCategories([
                    "All",
                    ...new Set(availableBooks.map((book) => book.category)),
                ]); // Include "All" as a default category
                setLoading(false);
            } catch (error) {
                console.error("Error fetching books:", error);
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    // Filter books based on selected category and search query
    const filteredBooks = books
        .filter(
            (book) =>
                selectedCategory === "All" || book.category === selectedCategory
        )
        .filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Calculate the books to display based on the current page
    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    // Handle pagination
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            {/* Categories Section */}
            <section>
                <h2 className="section-header mb-8 mt-4 text-2xl font-primary font-semibold">
                    Categories
                </h2>
                <div className="flex gap-x-4 gap-y-2 items-center flex-wrap font-semibold">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedCategory(category)} // Update selected category
                            className={`px-6 py-2 rounded-md shadow ${
                                selectedCategory === category
                                    ? "bg-red-400 text-white"
                                    : "bg-[#f0eee2] text-black"
                            } hover:shadow-xl cursor-pointer`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </section>

            {/* Books Section */}
            <section>
                <h2 className="section-header mb-8 mt-8 font-semibold">
                    {selectedCategory === "All"
                        ? "All Books"
                        : `${selectedCategory} Books`}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                    {currentBooks.map((book) => (
                        <div
                            key={book._id}
                            className="border p-4 rounded my-8 flex flex-col items-center"
                        >
                            <img
                                src={
                                    book.cover_image
                                        ? `http://127.0.0.1:8000/storage/${book.cover_image}`
                                        : "https://via.placeholder.com/150"
                                }
                                alt={book.title}
                                className="w-full h-60 object-contain rounded-md"
                            />
                            <h3 className="text-lg font-semibold mt-2 text-center">
                                {book.title}
                            </h3>
                            <Link
                                to={`/book/${book.id}`}
                                className="text-gray-500 font-bold mt-2 hover:text-red-600"
                            >
                                View Details
                            </Link>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Explore;
