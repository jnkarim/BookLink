import React from "react";
import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addtoCart } from "../../redux/features/cart/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();

  // Add to cart handler
  const handleAddToCart = (book) => {
    dispatch(addtoCart(book));
  };

  // Return null if book data is missing
  if (!book) {
    return null;
  }

  return (
    <div className="rounded-lg transition-shadow duration-300 shadow hover:shadow-lg bg-white">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4">
        {/* Image Section */}
        <div className="sm:h-72 sm:flex-shrink-0 border rounded-md overflow-hidden">
          <Link to={`/books/${book._id}`}>
            <img
              src={getImgUrl(book.coverImage)}
              alt={`Cover of ${book.title}`}
              className="w-full h-full object-cover p-2 rounded-md cursor-pointer hover:scale-105 transition-transform duration-200"
            />
          </Link>
        </div>

        {/* Details Section */}
        <div className="p-2">
          <Link to={`/books/${book._id}`}>
            <h3 className="text-xl font-semibold hover:text-blue-600 mb-3">
              {book.title || "Untitled"}
            </h3>
          </Link>
          <p className="text-gray-600 mb-5">
            {book.description
              ? book.description.length > 80
                ? `${book.description.slice(0, 80)}...`
                : book.description
              : "No description available."}
          </p>
          <p className="font-medium mb-5">
            ${book.newPrice?.toFixed(2)}{" "}
            {book.oldPrice && (
              <span className="line-through font-normal ml-2">
                ${book.oldPrice.toFixed(2)}
              </span>
            )}
          </p>
          <button
            onClick={() => handleAddToCart(book)}
            className="bg-primary text-white p-1 sm:px-6 px-2 flex items-center rounded-sm gap-2 hover:bg-primary-dark transition-colors"
            aria-label={`Add ${book.title || "this book"} to cart`}
          >
            <FiShoppingCart />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
