import React, { useState } from "react";
import loginImage from "../assets/login.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    setEmailError("");
    setPasswordError("");

    if (!email || !password) {
      if (!email) setEmailError("Email is required.");
      if (!password) setPasswordError("Password is required.");
      return;
    }

    alert("Login functionality is disabled in this demo.");
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center p-4">
        <img
          src={loginImage}
          alt="Login Illustration"
          className="w-4/5 sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-contain"
        />
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-4 sm:p-6 md:p-8">
        <h3 className="text-center text-4xl font-semibold mb-8 sm:mb-12">Log in</h3>

        {/* Email Input */}
        <div className="w-full sm:w-[300px] mb-6">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
              emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
            }`}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        {/* Password Input */}
        <div className="w-full sm:w-[300px] mb-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-400"
              }`}
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
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full sm:w-[300px] py-2.5 mb-6 bg-blue-500 text-white text-base rounded hover:bg-blue-600 transition ${
            loading && "cursor-not-allowed"
          }`}
        >
          {loading ? (
            <div className="animate-spin text-lg">Loading...</div>
          ) : (
            <>Log in</>
          )}
        </button>

        {/* Links */}
        <p className="w-full sm:w-[300px] text-sm mb-1 text-gray-600 text-left">
          Don&apos;t have an account?{" "}
          <a href="/register" className="font-semibold text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
