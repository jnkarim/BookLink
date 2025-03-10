import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const Explore = () => {
    const { setLoading, loading } = useOutletContext();
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState(["All"]);
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const booksPerPage = 6;
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("authToken");
                const response = await fetch("http://127.0.0.1:8000/api/books", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch books");
                }

                const data = await response.json();
                if (!Array.isArray(data)) throw new Error("Invalid data format");

                const availableBooks = data.filter(book => book.status === "available");
                setBooks(availableBooks);
                setCategories(["All", ...new Set(availableBooks.map(book => book.genre))]);
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, [setLoading]);

    const filteredBooks = books
        .filter(book => selectedCategory === "All" || book.genre === selectedCategory)
        .filter(book => book.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, i) => (
                        <div key={i} className="border p-4 rounded animate-pulse bg-gray-100">
                            <div className="h-60 bg-gray-300 rounded"></div>
                            <div className="mt-4 h-6 bg-gray-300 w-3/4 rounded"></div>
                            <div className="mt-2 h-4 bg-gray-300 w-1/2 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            {/* Search & Category Section */}
            <section className="sticky top-0 bg-white z-10 py-4">
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full max-w-sm p-2 border rounded"
                    />
                    <h2 className="text-2xl font-semibold">Genres</h2>
                </div>
                <div className="flex gap-2 flex-wrap font-semibold mt-2">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                setSelectedCategory(category);
                                setCurrentPage(1);
                            }}
                            className={`px-4 py-2 rounded-md shadow ${
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
                <h2 className="text-2xl font-semibold mt-6">
                    {selectedCategory === "All" ? "All Books" : `${selectedCategory} Books`}
                </h2>
                {filteredBooks.length === 0 ? (
                    <div className="text-center mt-6">
                        <img
                            src="https://via.placeholder.com/200"
                            alt="No results"
                            className="mx-auto mb-4"
                        />
                        <p className="text-gray-500">No books available.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                            {currentBooks.map((book) => (
                                <div key={book.id} className="border p-4 rounded flex flex-col items-center hover:shadow-lg">
                                    <img
                                        src={book.cover_image ? `http://127.0.0.1:8000/storage/${book.cover_image}` : "https://via.placeholder.com/150"}
                                        alt={book.title}
                                        className="w-full h-60 object-contain rounded-md"
                                    />
                                    <h3 className="text-lg font-semibold mt-2 text-center">{book.title}</h3>
                                    <span className="text-sm bg-blue-100 text-gray-900 px-2 py-1 rounded-md mt-1">{book.genre}</span>
                                    <Link to={`/book/${book.id}`} className="text-gray-500 font-bold mt-2 hover:text-red-600">
                                        View Details
                                    </Link>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center items-center mt-8">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => paginate(currentPage - 1)}
                                className="px-4 py-2 mx-1 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {Array.from({ length: Math.ceil(filteredBooks.length / booksPerPage) }, (_, i) => (
                                <button
                                    key={i + 1}
                                    onClick={() => paginate(i + 1)}
                                    className={`px-4 py-2 mx-1 rounded ${
                                        currentPage === i + 1 ? "bg-red-400 text-white" : "bg-[#f0eee2] text-black"
                                    } hover:shadow-xl cursor-pointer`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                disabled={currentPage === Math.ceil(filteredBooks.length / booksPerPage)}
                                onClick={() => paginate(currentPage + 1)}
                                className="px-4 py-2 mx-1 rounded bg-gray-200 text-black hover:bg-gray-300 disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </section>
        </div>
    );
};

export default Explore;
