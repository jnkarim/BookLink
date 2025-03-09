import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { MdPhone, MdEmail, MdLocationOn, MdChat, MdMenuBook } from "react-icons/md";

const UserProfile = () => {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const token = localStorage.getItem("authToken");

                const userResponse = await fetch(
                    `http://127.0.0.1:8000/api/users/${id}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!userResponse.ok) throw new Error("Failed to fetch user details");

                const userData = await userResponse.json();
                setUser(userData);

                const booksResponse = await fetch(
                    `http://127.0.0.1:8000/api/users/${id}/books`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                if (!booksResponse.ok) throw new Error("Failed to fetch user's books");

                const booksData = await booksResponse.json();
                setBooks(booksData.filter((book) => book.status === "available"));
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [id]);

    if (loading) return <p className="text-center text-gray-600 mt-10">Loading user details...</p>;
    if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
    if (!user) return <p className="text-center text-red-500 mt-10">User not found.</p>;

    const getGoogleMapsUrl = (address) => {
        const encodedAddress = encodeURIComponent(address);
        return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    };

    return (
        <div className="min-h-screen p-6">

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="relative h-28 bg-gray-900 flex items-center justify-center font-bold">
                    <h1 className="font-semibold text-2xl text-white">Book Owner&aposs Info</h1>
                </div>

                <div className="p-4">
                    <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>

                    {/* Contact Information */}
                    <div className="mt-4 space-y-2">
                        <p className="text-gray-700 flex items-center gap-2">
                            <MdEmail size={20} className="text-gray-600" />
                            <span className="font-semibold">Email:</span> {user.email}
                        </p>

                        <p className="text-gray-700 flex items-center gap-2">
                            <MdPhone size={20} className="text-gray-600" />
                            <span className="font-semibold">Contact Number:</span> {user.phone || "Not provided"}
                        </p>

                        <p className="text-gray-700 flex items-center gap-2">
                            <MdLocationOn size={20} className="text-gray-600" />
                            <span className="font-semibold">Location:</span> {user.address || "Not specified"}
                        </p>
                        {user.address && (
                            <a
                                href={getGoogleMapsUrl(user.address)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block text-md font-semibold text-sky-500 underline p-2 rounded-xl hover:text-red-500"
                            >
                                View on Map
                            </a>
                        )}
                    </div>
                </div>
            </div>

            {/* Available Books Slider */}
            <div className="max-w-4xl mx-auto mt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    <MdMenuBook size={28} className="text-gray-700" /> Available Books
                </h2>
                {books.length === 0 ? (
                    <p className="text-gray-500 text-center">No available books at the moment.</p>
                ) : (
                    <Swiper
                        modules={[Navigation, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation
                        pagination={{ clickable: true }}
                        breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
                        className="w-full "
                    >
                        {books.map((book) => (
                            <SwiperSlide key={book.id} >
                                <div className="bg-white py-4 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                                <img
                                                    src={
                                                        book.cover_image
                                                            ? `http://127.0.0.1:8000/storage/${book.cover_image}`
                                                            : "https://via.placeholder.com/150"
                                                    }
                                                    alt={book.title}
                                                    className="object-contain rounded-lg w-full h-64"
                                                />
                                    <div className="p-4">
                                        <h3 className="text-xl text-center font-semibold text-gray-900">{book.title}</h3>
                                        <p className="text-sm text-center text-sky-500 mt-2">Available</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>
        </div>
    );
};

export default UserProfile;
