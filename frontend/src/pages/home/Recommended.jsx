import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Recommended = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true); // Define loading state
  const [error, setError] = useState(null); // Define error state

  // Fetch book data from the API
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // Set loading to true when starting fetch
      try {
        const token = localStorage.getItem("authToken"); // Get the auth token
        const response = await fetch("http://127.0.0.1:8000/api/books", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token for authentication
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch books");
        }

        const data = await response.json();
        setBooks(data.filter((book) => book.status === "available")); // Filter for available books
      } catch (error) {
        setError(error.message); // Handle error
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false); // Ensure loading is false after fetch
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="py-16 flex flex-col lg:flex-row gap-8">
      {/* Books Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-3xl font-semibold mb-6">Recommended</h2>

        {/* Display error if there is one */}
        {error && <p className="text-red-500">Error: {error}</p>}

        {/* Show loading state */}
        {loading ? (
          <p>Loading books...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {books.length > 0 ? (
              books.slice(0, 4).map((book) => (
                <div key={book.id} className="border p-4 rounded shadow-md">
                  <img
                    src={
                      book.cover_image
                        ? `http://127.0.0.1:8000/storage/${book.cover_image}`
                        : "https://via.placeholder.com/150"
                    }
                    alt={book.title}
                    className="w-full h-60 object-contain rounded-md"
                  />
                  <h3 className="text-lg font-semibold mt-2 text-center text-gray-700">
                    {book.title}
                  </h3>
                  <Link
                    to={`/book/${book.id}`}
                    className="text-gray-500 font-bold mt-2 inline-block px-16 hover:text-red-600"
                  >
                    View Details
                  </Link>
                </div>
              ))
            ) : (
              <p>No available books found.</p>
            )}
          </div>
        )}
      </div>

      {/* Notifications Section */}
      <div className="w-full lg:w-1/2 p-6 lg:mx-8">
        <h3 className="text-3xl font-base mb-6 -my-6">Notifications</h3>
        <ul className="space-y-4">
          <li className="bg-[#f0eee2] p-6 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
            &apos;The Time Has Come&apos; is available to borrow.
              <br /> Check it out!
            </p>
          </li>
          <li className="bg-[#f0eee2] p-4 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
            &aposThe Fault in Our Stars&apos is available to borrow.
              <br /> Check it out!
            </p>
          </li>
          <li className="bg-[#f0eee2] p-4 rounded shadow-sm">
            <h2 className="font-bold">New Book Added</h2>
            <p className="text-black">
            &aposSherlock Holmes&apos is available to borrow.
              <br /> Check it out!
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Recommended;
