import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { PiStarFill } from "react-icons/pi";

const BookDetails = () => {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Simulated book data
  const mockBookData = {
    id: "12345",
    title: "Sample Book",
    authors: [{ id: "1", name: "Author One" }],
    image: "https://via.placeholder.com/150",
    rating: 4.5,
    intro: "This is a brief introduction to the book.",
    genres: [{ id: "1", name: "Fantasy" }, { id: "2", name: "Adventure" }],
    desc: "Detailed description of the book.",
  };

  useEffect(() => {
    // Simulating fetching book data from a server
    if (bookId === mockBookData.id) {
      setBook(mockBookData);
    }
  }, [bookId]);

  const handleBookMark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex gap-x-16 ml-12 relative">
        <div className="absolute right-0 top-0 gap-y-4 flex flex-col items-end">
          <Link
            to={`/book/${bookId}/content?type=byte`}
            className="flex gap-x-2 transition duration-300 items-center primary-btn py-1.5 w-36 justify-center text-sm"
          >
            <p>Byte</p>
          </Link>
          <Link
            to={`/book/${bookId}/content?type=chapter`}
            className="flex gap-x-2 transition duration-300 items-center secondary-btn py-1.5 text-sm w-36 justify-center"
          >
            <p>Full Book</p>
          </Link>
        </div>
      </div>

      <div className="flex gap-x-16 ml-12">
        <div className="w-1/5 rounded-xl shadow-xl z-10">
          <div
            className="pb-[133%] rounded-xl bg2"
            style={{
              backgroundImage: `url(${book.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
        </div>

        <div className="w-1/2">
          <h3 className="font-semibold text-4xl mb-2 flex items-start gap-x-6 relative">
            {book.title}
          </h3>
          <p className="text-lg content2 h-16 overflow-hidden">
            By{" "}
            {book.authors.map(({ id, name }) => (
              <span key={id} className="mr-2">
                {name}
              </span>
            ))}
          </p>

          <div className="flex gap-x-4 mt-2">
            <div className="flex gap-x-2 items-center text-amber-500">
              <PiStarFill size={18} />
              <p className="">
                {book?.rating > 0 ? book?.rating.toFixed(2) : "No rating"}
              </p>
            </div>
          </div>

          <p className="content2 my-4 w-3/4">{book.intro}</p>
        </div>
      </div>

      <div className="bg-pure w-full -mt-24 rounded-xl border-2 border-bkg-2">
        <div className="mt-6 mr-8 flex gap-4">
          <div className="flex-1"></div>
          <button onClick={handleBookMark} className="bg2 rounded-full p-4">
            {isBookmarked ? <IoBookmark /> : <IoBookmarkOutline />}
          </button>
        </div>

        <div className="flex gap-x-16 mt-16 mx-12 mb-12">
          <div className="w-3/5">
            <p className="font-semibold text-lg mb-4">Genres</p>
            <div className="flex flex-wrap items-center mb-12 gap-2">
              {book.genres.map(({ id, name }) => (
                <Link
                  key={id}
                  to={`/reader/genre/${id}`}
                  className="px-4 py-1.5 border border-check rounded-full"
                >
                  {name}
                </Link>
              ))}
            </div>

            <p className="font-semibold text-lg mb-4">Description</p>
            <p className="text-justify">{book.desc}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
