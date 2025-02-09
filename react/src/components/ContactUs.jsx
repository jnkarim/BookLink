import React from "react";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6 flex justify-center items-center">
      {/* Container for content */}
      <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl duration-300 ease-in-out">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 text-center mb-6 animate__animated animate__fadeIn">
          Get In Touch
        </h1>

        {/* Intro Text */}
        <p className="text-lg sm:text-xl text-gray-700 text-center mb-6 animate__animated animate__fadeIn animate__delay-1s">
          We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
        </p>

        {/* Contact Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <div className="mb-4">
            <label
              className="block text-lg sm:text-xl font-medium text-gray-800 mb-1"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Field */}
          <div className="mb-4">
            <label
              className="block text-lg sm:text-xl font-medium text-gray-800 mb-1"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105"
              placeholder="Enter your email"
            />
          </div>

          {/* Message Field */}
          <div className="mb-4">
            <label
              className="block text-lg sm:text-xl font-medium text-gray-800 mb-1"
              htmlFor="message"
            >
              Your Message
            </label>
            <textarea
              id="message"
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-300 ease-in-out transform hover:scale-105"
              rows="4"
              placeholder="Write your message"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 text-white font-semibold text-lg sm:text-xl rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Message
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-500 animate__animated animate__fadeIn animate__delay-2s">
          <p className="text-sm sm:text-base">
            &copy; {new Date().getFullYear()} Booklink. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
