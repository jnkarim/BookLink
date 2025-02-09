import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.png";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineHome } from "react-icons/ai";
import { ClipLoader } from "react-spinners"; // Import the spinner component

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6; // Example: minimum 6 characters
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: userEmail,
        password: userPassword,
      });

      setLoading(false);

      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        alert(response.data.message);

        // Use window.location.replace to reload smoothly and keep the app's current state
        window.location.replace("/"); // This reloads the page and goes to the home route

      } else {
        alert("TRY AGAIN!");
      }
    } catch (error) {
      setLoading(false);
      alert("An error occurred. Please try again.");
      console.error(error);
    }
  };

  // Function to toggle password visibility
  const handlePasswordToggle = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center p-4">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-4/5 sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-contain"
        />
      </div>

      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <h3 className="text-center text-secondary text-4xl font-semibold text-gray-900 mb-8 sm:mb-12">
          Log in
        </h3>

        <div className="w-full sm:w-[350px] mb-6">
          <input
            type="text"
            placeholder="Email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 ${
              emailError
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-gray-900"
            } transition duration-300`}
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        <div className="w-full sm:w-[350px] mb-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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
              onClick={handlePasswordToggle}
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
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full sm:w-[350px] py-3 mb-6 bg-gray-900 text-white text-base rounded-md hover:bg-black transition ${
            loading && "cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? (
            <ClipLoader size={20} color="#ffffff" />
          ) : (
            "Log in"
          )}
        </button>

        {/* Links */}
        <p className="w-full sm:w-[350px] text-sm mb-1 text-gray-600 text-left">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-gray-900 hover:underline"
          >
            Sign up
          </Link>
        </p>

        {/* Home Icon */}
        <Link
          to="/"
          className="fixed top-5 left-5 bg-white p-3 rounded-full shadow-md hover:bg-gray-100 transition"
        >
          <AiOutlineHome className="text-2xl text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
