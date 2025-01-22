import React from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCompass,
  FaHome,
  FaHighlighter,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { IoChatbox } from "react-icons/io5";
import { IoMdHome } from "react-icons/io";

const Navbar = () => {
  const currentUser = true; /*Check if user is logged in or not*/
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-[#E7E7E4] w-72 h-full px-12 py-16 flex flex-col">
        <h1 className="text-2xl font-semibold mb-12 font-secondary">
          BookLink
        </h1>
        <nav className="flex flex-col gap-6">
          <Link
            to="/"
            className="hover:text-red-600 flex items-center gap-3 font-secondary"
          >
            <FaHome size={20} />
            <span>For You</span>
          </Link>
          <Link
            to="/explore"
            className="hover:text-red-600 flex items-center gap-3 font-secondary"
          >
            <FaCompass size={20} />
            <span>Explore</span>
          </Link>

          {currentUser /*Check if user is logged in or not*/ ? (
            <>
              <Link
                to="/chat"
                className="hover:text-red-600 flex items-center gap-3 font-secondary"
              >
                <IoChatbox size={20} />
                <span>Chat</span>
              </Link>
              <Link
                to="/profile"
                className="hover:text-red-600 flex items-center gap-3 font-secondary"
              >
                <FaUser size={20} />
                <span>Profile</span>
              </Link>
              <Link
                to="/settings"
                className="hover:text-red-600 flex items-center gap-3 font-secondary"
              >
                <FaCog size={20} />
                <span>Settings</span>
              </Link>
            </>
          ) : (
            " "
          )}

          <Link
            to="/login"
            className="hover:text-red-600 flex items-center gap-3"
          >
            <FaSignOutAlt size={20} />
            <span>Log In</span>
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Navbar;
