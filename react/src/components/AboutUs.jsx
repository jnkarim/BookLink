import React from "react";
// Import local images
import julkerImage from "../assets/julker.jpg";
import nahidImage from "../assets/nahid.jpg";
import yeasImage from "../assets/yeas.jpg";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-6">
      {/* Container for content */}
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-8">
          About Us
        </h1>

        {/* Intro Text */}
        <p className="text-lg sm:text-xl leading-8 text-gray-600 text-center mb-8">
          Welcome to our website! We are a passionate team of developers and designers dedicated to creating intuitive and engaging web applications.
          Our goal is to provide value-driven solutions that meet the needs of businesses and users alike.
        </p>

        {/* Developer Information Section */}
        <div className="space-y-8">
          <h2 className="text-2xl font-semibold text-gray-700">Meet the Team</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {/* Developer 1 */}
            <div className="flex flex-col items-center text-center">
              <img
                src={julkerImage}
                alt="Julker Nayeen Karim"
                className="rounded-full w-32 h-32 mb-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              />
              <h3 className="font-semibold text-lg text-gray-800">Julker Nayeen Karim</h3>
              <p className="text-gray-600">Backend Developer</p>
              <p className="text-gray-500 mt-2">julkernkarim@gmail.com</p>
            </div>

            {/* Developer 2 */}
            <div className="flex flex-col items-center text-center">
              <img
                src={nahidImage}
                alt="Md Nahid Hossain"
                className="rounded-full w-32 h-32 mb-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              />
              <h3 className="font-semibold text-lg text-gray-800">Md Nahid Hossain</h3>
              <p className="text-gray-600">Frontend Developer</p>
              <p className="text-gray-500 mt-2">nahidmax143@gmail.com</p>
            </div>

            {/* Developer 3 */}
            <div className="flex flex-col items-center text-center">
              <img
                src={yeasImage}
                alt="Md Yeas"
                className="rounded-full w-32 h-32 mb-4 transition-transform transform hover:scale-105 duration-300 ease-in-out"
              />
              <h3 className="font-semibold text-lg text-gray-800">Md Yeas</h3>
              <p className="text-gray-600">Leader and Boss</p>
              <p className="text-gray-500 mt-2">yeashahmed23@gmail.com</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm sm:text-base text-gray-500">
          <p>&copy; {new Date().getFullYear()} Booklink. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;