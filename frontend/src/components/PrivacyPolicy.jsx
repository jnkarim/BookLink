import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 text-center mb-8">
          Privacy Policy
        </h1>
        
        {/* Intro Text */}
        <p className="text-lg sm:text-xl leading-8 text-gray-600 mb-6">
          Welcome to our platform. This privacy policy outlines how we collect, use, and protect your personal information when you use our services.
        </p>

        {/* Privacy Policy Details */}
        <div className="space-y-6 text-lg sm:text-xl text-gray-700">
          <p>
            <strong className="font-semibold">1. Book Exchange:</strong> By using our platform, you, as the owner of a book, can exchange it with other users. Exchanges will be facilitated through chat functionality on this website.
          </p>
          <p>
            <strong className="font-semibold">2. Personal Information:</strong> When signing up, you will need to provide your phone number and address. These details are required for facilitating book exchanges and enabling communication with other users.
          </p>
          <p>
            <strong className="font-semibold">3. Data Usage:</strong> Your personal information, such as your phone number and address, will only be used for the purpose of facilitating exchanges and communication. We are committed to keeping your information secure and confidential.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm sm:text-base text-gray-500">
          <p>&copy; {new Date().getFullYear()} Booklink. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
