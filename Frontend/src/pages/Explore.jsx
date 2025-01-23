import { useEffect, useState } from "react";
import { Link } from "react-router";

const Explore = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All"); // Track selected category
  const [loading, setLoading] = useState(true);

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

  // Filter books based on selected category
  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div>
      {/* Categories Section */}
      <section>
        <h2 className="section-header mb-8 mt-16">Categories</h2>
        <div className="flex gap-x-4 gap-y-2 items-center flex-wrap ">
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
        <h2 className="section-header mb-8 mt-16">
          {selectedCategory === "All"
            ? "All Books"
            : `${selectedCategory} Books`}
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {filteredBooks.map((book) => (
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
      </section>
    </div>
  );
};

export default Explore;
