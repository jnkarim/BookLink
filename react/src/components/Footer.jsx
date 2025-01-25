import React from "react";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-[#f0eee2] text-gray-900 py-10 border-t -mx-6">
      <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-screen-xl mx-auto px-6">
        {/* Left Side - Privacy Links */}
        <ul className="flex gap-6 mb-4 md:mb-0 font-semibold">
          <li>
            <a href="#privacy" className="hover:text-red-600">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-red-600">
              About Us
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-red-600">
              Contact Us
            </a>
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
