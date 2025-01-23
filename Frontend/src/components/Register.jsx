import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineHome } from "react-icons/ai";
import SignupImage from "../assets/signup.png";

// Password strength checker
const checkPasswordStrength = (password) => {
  const regex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\\$%\\^&\\*])(?=.{6,})"
  );
  return regex.test(password);
};

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("Weak");

  const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const signup = async () => {
    if (loading) return;

    if (!name || !email || !password || !phone || !address || !isAccepted) {
      alert("Please fill in all fields and accept the terms.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    if (password.length < 6 || !checkPasswordStrength(password)) {
      alert(
        "Password must contain at least 6 characters and include uppercase, lowercase, numbers, and special characters."
      );
      return;
    }

    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      alert("Registered successfully!");
    }, 2000);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (checkPasswordStrength(value)) {
      setPasswordStrength("Strong");
    } else if (value.length >= 6) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Weak");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Home Icon */}
      <Link
        to="/"
        className="fixed top-5 left-5 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition"
      >
        <AiOutlineHome className="text-2xl text-gray-600" />
      </Link>

      {/* Left Section */}
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center">
        <img
          src={SignupImage}
          alt="Signup Illustration"
          className="w-4/5 sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <h3 className="text-center text-3xl sm:text-4xl font-semibold mb-8 sm:mb-12">
          Sign up
        </h3>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Phone Number Input */}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Address Input */}
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        {/* Password Input */}
        <div className="relative w-full sm:w-[300px] mb-6">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password (at least 6 characters)"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="text-lg" />
            ) : (
              <AiOutlineEye className="text-lg" />
            )}
          </span>
        </div>

        {/* Password Strength Indicator */}
        <div className="text-sm text-gray-500 mb-4">
          Password strength:{" "}
          <span
            className={
              passwordStrength === "Strong"
                ? "text-green-500"
                : passwordStrength === "Medium"
                ? "text-yellow-500"
                : "text-red-500"
            }
          >
            {passwordStrength}
          </span>
        </div>

        {/* Terms and Conditions Checkbox */}
        <div className="mb-6">
          <label className="flex items-center text-sm">
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={(e) => setIsAccepted(e.target.checked)}
              className="mr-2"
            />
            I agree to the{" "}
            <a href="/terms" className="text-blue-500 hover:underline">
              Terms and Conditions
            </a>
          </label>
        </div>

        {/* Signup Button */}
        <button
          className={`w-full sm:w-[300px] py-2.5 mb-6 text-white bg-blue-500 rounded hover:bg-blue-600 transition ${
            loading ? "cursor-not-allowed" : ""
          }`}
          onClick={signup}
        >
          {!loading ? (
            <>Sign up</>
          ) : (
            <div className="animate-spin text-lg">
              <CgSpinner />
            </div>
          )}
        </button>

        {/* Login Redirect */}
        <Link
          to="/login"
          className="text-sm text-gray-600 hover:underline w-full sm:w-[300px] text-left"
        >
          Already have an account?{" "}
          <span className="font-semibold text-blue-500">Log in</span>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
