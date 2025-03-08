import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import autoplay styles

// Import required modules
import { Autoplay, Pagination } from "swiper/modules";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiBars3CenterLeft } from "react-icons/hi2";
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { FaExchangeAlt } from "react-icons/fa";
import { getImgUrl } from "../../utils/getImgUrl";


function Banner() {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch data from books.json
    fetch("/books.json")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <>
      <header className="max-w-screen-2xl mx-auto py-2">
        <nav className="flex justify-between items-center">
          {/* Left side */}
          <div className="flex items-center md:gap-8 gap-4">
            <Link to="/">
              <HiBars3CenterLeft className="w-6 h-6" />
            </Link>

            {/* Search input */}
            <div className="relative w-55">
              <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-700" />
              <input
                type="text"
                placeholder="eg, Sherlock Holmes"
                className="bg-[#EAEAEA] w-full py-2 pl-10 rounded-md focus:outline-none text-sm"
              />
            </div>
          </div>

          <div className="relative flex items-center md:space-x-6 space-x-3">
            {/* Cart */}
            <Link
              to="/cart"
              className="bg-gray-900 text-white py-1 sm:px-6 px-2 flex items-center rounded-sm gap-2"
            >
              <FaExchangeAlt className="w-6 h-6" />
            </Link>
          </div>

        </nav>
      </header>

      <div className="flex flex-col-reverse md:flex-row w-full justify-between items-center py-16 gap-12">
        <div className="md:w-1/2 w-full">
          <h1 className="md:text-5xl text-2xl font-bold mb-7 font-secondary text-gray-900">
            Happy Reading
          </h1>
          <p className="mb-10 text-lg">
            Welcome to our book sanctuary! Explore captivating
            <br /> stories and diverse genres. Immerse yourself in a world{" "}
            <br /> of literary delights. Borrow and exchange books effortlessly
            <br />
            in a cashless, sustainable way while sharing your
            <br />
            collection and accessing others' treasures.
          </p>

          <Link
            to="/explore"
            className="bg-gray-900 px-8 py-2 rounded-full text-white text-base font-secondary font-bold hover:bg-secondary hover:text-white cursor-pointer transition-all duration-200 "
          >
            Explore
          </Link>
        </div>

        <div className="md:w-1/2 w-full flex flex-col items-center -my-12">
          <h3 className="section-header font-secondary text-3xl font-bold text-gray-800">
            Featured Books
          </h3>
          <Swiper
            modules={[Autoplay, Pagination]}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 2000, // Slide every 2 seconds
              disableOnInteraction: false, // Allows interaction with the swiper while it is autoplaying
            }}
            spaceBetween={20}
            slidesPerView={1}
            className="w-[320px] h-[320px] rounded-lg bg-white"
          >
            {books.slice(8, 12).map((book) => (
              <SwiperSlide key={book._id}>
                <div className="flex flex-col items-center justify-center h-full p-4 text-center bg-[#fdfcf7]">
                  <img
                    src={getImgUrl(book.coverImage)}
                    alt={book.title}
                    className="w-full h-48 object-contain mb-2"
                  />
                  <h4 className="text-sm font-bold text-gray-700 ">
                    {book.title}
                  </h4>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default Banner;
