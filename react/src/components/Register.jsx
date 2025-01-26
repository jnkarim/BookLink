import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners"; // Spinner component
import SignupImage from "../assets/signup.png";

const Signup = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [acceptError, setAcceptError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const validatePassword = (password) => password.length >= 6;

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Input validations
    if (!userName.trim()) {
      alert("Name is required.");
      setLoading(false);
      return;
    }

    if (!validateEmail(userEmail)) {
      setEmailError("Please enter a valid email.");
      setLoading(false);
      return;
    } else {
      setEmailError("");
    }

    if (!validatePassword(userPassword)) {
      setPasswordError("Password must be at least 6 characters.");
      setLoading(false);
      return;
    } else {
      setPasswordError("");
    }

    if (!isAccepted) {
      setAcceptError("You must accept the terms and conditions.");
      setLoading(false);
      return;
    } else {
      setAcceptError("");
    }

    // Create user object
    const user = {
      name: userName,
      email: userEmail,
      phone: userPhone,
      address: userAddress,
      password: userPassword,
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/registeruser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();
      setLoading(false);

      if (data.token) {
        alert(data.message);
        localStorage.setItem("authToken", data.token);
        window.location.replace("/profile"); // Redirect to the profile page
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      {/* Home Icon */}
      <Link
        to="/"
        className="fixed top-5 left-5 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <AiOutlineHome className="text-2xl text-gray-600" />
      </Link>

      {/* Left Section */}
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center p-4">
        <img
          src={SignupImage}
          alt="Signup Illustration"
          className="w-4/5 sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <h3 className="text-center text-4xl font-semibold text-gray-900 mb-8">
          Sign up
        </h3>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-gray-900 transition duration-300"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          className={`w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 ${
            emailError
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:ring-gray-900"
          } transition duration-300`}
        />
        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}

        {/* Phone Input */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={userPhone}
          onChange={(e) => setUserPhone(e.target.value)}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-gray-900 transition duration-300"
        />

        {/* Address Input */}
        <input
          type="text"
          placeholder="Address"
          value={userAddress}
          onChange={(e) => setUserAddress(e.target.value)}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md focus:outline-none focus:ring-2 border-gray-300 focus:ring-gray-900 transition duration-300"
        />

        {/* Password Input */}
        <div className="relative w-full sm:w-[350px] mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (at least 6 characters)"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              passwordError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-900"
            } transition duration-300`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2 text-gray-600"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-lg" />
            ) : (
              <AiOutlineEye className="text-lg" />
            )}
          </button>
        </div>
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        {/* Terms and Conditions */}
        <div className="mb-6 w-full sm:w-[350px] text-sm">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              className="mr-2"
            />
            I accept the terms and conditions.
          </label>
          {acceptError && (
            <p className="text-red-500 text-xs mt-1">{acceptError}</p>
          )}
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className={`w-full sm:w-[350px] py-3 mb-6 bg-gray-900 text-white text-base rounded-md hover:bg-black transition ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign up"}
        </button>
       {/* Login Redirect */}
       <Link
          to="/login"
          className="text-sm text-gray-600 hover:underline w-full sm:w-[300px] text-left"
        >
          Already have an account?{" "}
          <span className="font-semibold text-gray-900">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
