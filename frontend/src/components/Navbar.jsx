import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaCompass, FaHome, FaCog, FaSignOutAlt } from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { useAuth } from "../utils/context/AuthContext";

const Navbar = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    // Function to handle logout
    const handleLogout = () => {
        setIsAuthenticated(false); // Update authentication state
        localStorage.removeItem("authToken"); // Remove token from storage
        navigate("/login"); // Redirect to login page
    };

    // Don't show Navbar on login and signup pages
    if (location.pathname === "/login" || location.pathname === "/register") {
        return null;
    }

    return (
        <div className="flex h-min-screen">
            {/* Sidebar */}
            <aside className="bg-[#f0eee2] w-72 h-full px-12 py-16 flex flex-col">
                <h1 className="text-2xl font-semibold mb-12 text-tertiary">
                    BookLink
                </h1>
                <nav className="flex flex-col gap-6">
                    <Link
                        to="/"
                        className="hover:text-red-600 flex items-center gap-3"
                        style={{ fontFamily: "var(--font-secondary)" }}
                    >
                        <FaHome size={20} />
                        <span>For You</span>
                    </Link>
                    <Link
                        to="/explore"
                        className="hover:text-red-600 flex items-center gap-3"
                        style={{ fontFamily: "var(--font-secondary)" }}
                    >
                        <FaCompass size={20} />
                        <span>Explore</span>
                    </Link>

                    {isAuthenticated ? (
                        <>
                            <Link
                                to="/profile"
                                className="hover:text-red-600 flex items-center gap-3"
                                style={{ fontFamily: "var(--font-secondary)" }}
                            >
                                <FaUser size={20} />
                                <span>Profile</span>
                            </Link>
                            <Link
                                to="/settings"
                                className="hover:text-red-600 flex items-center gap-3"
                                style={{ fontFamily: "var(--font-secondary)" }}
                            >
                                <FaCog size={20} />
                                <span>Settings</span>
                            </Link>
                            {/* Log Out button */}
                            <button
                                onClick={handleLogout}
                                className="hover:text-red-600 flex items-center gap-3"
                                style={{ fontFamily: "var(--font-secondary)" }}
                            >
                                <FaSignOutAlt size={20} />
                                <span>Log Out</span>
                            </button>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className="hover:text-red-600 flex items-center gap-3"
                            style={{ fontFamily: "var(--font-secondary)" }}
                        >
                            <FaSignOutAlt size={20} />
                            <span>Log In</span>
                        </Link>
                    )}
                </nav>
            </aside>
        </div>
    );
};

export default Navbar;
