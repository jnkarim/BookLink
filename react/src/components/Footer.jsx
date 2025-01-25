import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import PrivacyPolicy from "./PrivacyPolicy"; // Import Privacy Policy component
import AboutUs from "./AboutUs"; // Import About Us component
import ContactUs from "./ContactUs"; // Import Contact Us component

const Footer = () => {
  return (
    <div className="bg-[#f0eee2] text-gray-900 py-10 border-t -mx-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl mx-auto px-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0 font-semibold">
          <li>
            <Link to="/privacy" className="hover:text-red-600">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/about" className="hover:text-red-600">
              About Us
            </Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-red-600">
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Right Side - Social Icons */}
        <div className="flex gap-6">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaFacebook size={24} className="text-gray-900" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaTwitter size={24} className="text-gray-900" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            <FaInstagram size={24} className="text-gray-900" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
