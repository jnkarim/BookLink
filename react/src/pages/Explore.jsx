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

  // Fetch book data from books.json
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/books.json");
        const data = await response.json();

        setBooks(data);
        setCategories(["All", ...new Set(data.map((book) => book.category))]); // Include "All" as a default category
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
    .filter((book) => 
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
        <h2 className="section-header mb-8 mt-16 text-2xl font-primary font-semibold">Categories</h2>
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

      {/* Search Bar Section (Positioned in the top-right corner) */}
      <section className="absolute top-16 right-8 z-10">
        <input
          type="text"
          placeholder="Search books..."
          className="w-45 p-2 border border-gray-700 rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </section>

      {/* Books Section */}
      <section>
        <h2 className="section-header mb-8 mt-16 font-semibold">
          {selectedCategory === "All"
            ? "All Books"
            : `${selectedCategory} Books`}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {currentBooks.map((book) => (
            <div
              key={book._id}
              className={`border p-4 rounded my-8 flex flex-col items-center ${
                !book.available ? "opacity-50" : ""
              }`} // Flexbox ensures alignment
              title={!book.available ? "Not Available" : ""}
            >
              <img
                src={`/books/${book.coverImage}`}
                alt={book.title}
                className={`w-full h-60 object-contain rounded-md ${
                  !book.available ? "grayscale" : ""
                }`} // Grayscale for unavailable books
              />
              <h3 className="text-lg font-semibold mt-2 text-center">
                {book.title}
              </h3>
              <Link
                to={`/book/${book._id}`}
                className="text-gray-500 font-bold mt-2 hover:text-red-600"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center gap-4 mt-8">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="px-6 py-2 text-white rounded-md bg-gray-900 hover:bg-gray-300"
            >
              Prev
            </button>
          )}
          {currentPage < Math.ceil(filteredBooks.length / booksPerPage) && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="px-6 py-2 text-white rounded-md bg-gray-900 hover:bg-gray-300"
            >
              Next
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default Explore;
