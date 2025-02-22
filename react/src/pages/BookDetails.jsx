import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PiStarFill } from "react-icons/pi"; // Import the PiStarFill icon

const BookDetails = () => {
  const { id } = useParams(); // Get the book id from the URL
  const [book, setBook] = useState(null);
  const [allBooks, setAllBooks] = useState([]); // To store all books
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // For error handling

  // Fetch all books from /books.json
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/books.json");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setAllBooks(data); // Set all books data
      } catch (error) {
        setError("Error fetching book data.");
        console.error("Error fetching book data:", error);
      }
    };

    fetchBooks();
  }, []); // Run only once on component mount

  // Fetch book details based on the id
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const foundBook = allBooks.find((book) => book._id === Number(id));

        if (foundBook) {
          setBook(foundBook); // Set the book data
        } else {
          setError("Book not found."); // Display error message if no book found
        }
      } catch (error) {
        setError("Error fetching book details.");
        console.error("Error fetching book details:", error);
      } finally {
        setLoading(false); // Set loading to false once fetch is done
      }
    };

    if (allBooks.length > 0) {
      fetchBookDetails(); // Fetch the current book details once all books are available
    }
  }, [id, allBooks]); // Run whenever `id` or `allBooks` changes

  if (loading) {
    return <div className="text-center text-lg font-semibold text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-lg font-semibold text-red-500">{error}</div>; // Handle error state
  }

  // Get recommendations: books with the same category
  const recommendedBooks = allBooks.filter(
    (b) => b.category === book.category && b._id !== book._id
  );

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <div className="flex gap-x-12 mb-8">
        {/* Book Image */}
        <div className="w-1/3 bg-gray-200 rounded-lg shadow-xl">
          <img
            src={`/books/${book.coverImage}`}
            alt={book.title}
            className="w-full h-full object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Book Information */}
        <div className="w-2/3 space-y-6">
          {/* Book Title */}
          <h2 className="text-4xl font-semibold text-gray-800 tracking-tight">{book.title}</h2>

          {/* Author Section */}
          <div className="flex items-center space-x-2 text-gray-900">
            <span className="text-lg">By</span>
            <span className="font-semibold text-gray-1200">{book.author}</span> {/* Displaying author */}
          </div>

          {/* Rating Section */}
          <div className="flex gap-x-6 mt-4 items-center text-amber-500">
            <span className="flex items-center text-xl">
              <PiStarFill className="w-5 h-5" />
              <span className="ml-1">{book?.rating > 0 ? book?.rating.toFixed(2) : "No rating"}</span>
            </span>
          </div>

          {/* Description Section */}
          <div className="mt-4">
            <p className="text-lg text-gray-800 leading-relaxed">{book.description}</p>
          </div>

          {/* Category and Price Section */}
          <div className="flex gap-x-8 mt-6">
            <p className="text-lg text-gray-700">Category: <span className="font-semibold">{book.category}</span></p>
            <p className="text-lg font-semibold text-gray-900">Price: <span className="text-2xl text-green-600">${book.newPrice}</span></p>
          </div>
        </div>
      </div>
      {/* Recommendations Section */}
      <div className="mt-40"> {/* Increased margin-top for larger gap */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Recommendations</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {recommendedBooks.length > 0 ? (
            recommendedBooks.map((recBook) => (
              <Link to={`/book/${recBook._id}`} key={recBook._id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="w-full h-36 flex justify-center items-center bg-gray-200">
                    <img
                      src={`/books/${recBook.coverImage}`}
                      alt={recBook.title}
                      className="h-full object-contain"
                    />
                  </div>
                  <div className="p-2">
                    <h4 className="text-sm font-semibold text-gray-800 truncate">
                      {recBook.title}
                    </h4>
                    <div className="mt-2">
                      <Link
                        to={`/book/${recBook._id}`}
                        className="text-gray-500 font-bold mt-2 hover:text-red-600"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-lg text-gray-600">No recommendations available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
