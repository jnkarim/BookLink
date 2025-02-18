import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [books, setBooks] = useState([]);

  // Fetch book data from books.json
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/books.json");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="py-16 flex flex-col lg:flex-row gap-8">
      {/* Books Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-semibold mb-6">Recommended</h2>
        {/* Grid Layout for Books */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {books
            .filter((book) => book.available) // Filter only available books
            .slice(0, 4) // Limit to first 4 available books (adjust as needed)
            .map((book) => (
              <div key={book.id} className="border p-4 rounded shadow-md">
                <img
                  src={`/books/${book.coverImage}`}
                  alt={book.title}
                  className="w-full h-60 object-contain rounded-md"
                />
                <h3 className="text-lg font-semibold mt-2 text-center text-gray-700">
                  {book.title}
                </h3>

                <Link
                  to={`/book/${book._id}`}
                  className="text-gray-500 font-bold mt-2 inline-block px-16 hover:text-red-600"
                >
                  View Details
                </Link>
              </div>
            ))}
        </div>
      </div>

      {/* Notifications Section */}
      <div className="w-full lg:w-1/2 p-6 lg:mx-8">
        <h3 className="text-3xl font-base mb-6 -my-6">Notifications</h3>
        <ul className="space-y-4">
          <li className="bg-[#f0eee2] p-6 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
              "The Time Has Come" is available to borrow.
              <br /> Check it out!
            </p>
          </li>
          <li className="bg-[#f0eee2] p-4 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
              "The Fault in Our Stars" is available to borrow.
              <br /> Check it out!
            </p>
          </li>
          <li className="bg-[#f0eee2] p-4 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
              "Sherlock Holmes is available to borrow.
              <br /> Check it out!
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Recommended;
