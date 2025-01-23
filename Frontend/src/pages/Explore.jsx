import { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Use Link from react-router-dom

const Explore = () => {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [latestBooks, setLatestBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch book data from books.json
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch("/books.json");
        const data = await response.json();

        setTrendingBooks(data.filter((book) => book.trending));
        setLatestBooks(data.filter((book) => !book.trending));
        setCategories([
          ...new Set(data.map((book) => book.category)), // Get unique categories
        ]);
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

  return (
    <div>

      <section>
        <h2 className="section-header mb-8 mt-16">Categories</h2>
        <div className="flex gap-x-4 gap-y-2 items-center flex-wrap">
          {categories.map((category, index) => (
            <Link
              to={`/reader/genre/${category}`} // Use 'to' instead of 'href'
              key={index}
              className="bg2 px-6 py-2 rounded-md shadow hover:shadow-xl cursor-pointer"
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section>

        <div className="grid grid-cols-3 gap-4">
          {latestBooks.map((book) => (
            <div key={book._id} className="border p-4 rounded  my-8">
              <img
                src={`/books/${book.coverImage}`}
                alt={book.title}
                className="w-full h-60 object-contain rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2 text-center">{book.title}</h3>

              <p className="text-xl font-bold mt-2">${book.newPrice}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Explore;
