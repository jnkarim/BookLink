import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginImage from "../assets/login.png";
import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineHome } from "react-icons/ai";
import { ClipLoader } from "react-spinners";

const Login = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    userPassword: "",
    showPassword: false,
    loading: false,
    emailError: "",
    passwordError: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInput = () => {
    const { userEmail, userPassword } = formData;
    const emailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(userEmail);
    const passwordValid = userPassword.length >= 6;
    setFormData((prev) => ({
      ...prev,
      emailError: emailValid ? "" : "Please enter a valid email.",
      passwordError: passwordValid ? "" : "Password must be at least 6 characters.",
    }));
    return emailValid && passwordValid;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateInput()) return;

    setFormData((prev) => ({ ...prev, loading: true }));
    try {
      const { userEmail, userPassword } = formData;
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email: userEmail,
        password: userPassword,
      });

      setFormData((prev) => ({ ...prev, loading: false }));
      if (response.data.token) {
        localStorage.setItem("authToken", response.data.token);
        window.location.replace("/");
      } else {
        alert("TRY AGAIN!");
      }
    } catch (error) {
      setFormData((prev) => ({ ...prev, loading: false }));
      alert("An error occurred. Please try again.");
    }
  };

  const togglePasswordVisibility = () => {
    setFormData((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const { userEmail, userPassword, showPassword, loading, emailError, passwordError } = formData;

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50 transition-all duration-300">
      <div className="lg:w-1/2 w-full h-full flex justify-center items-center p-4">
        <img src={loginImage} alt="Login Illustration" className="w-4/5 sm:w-3/4 lg:w-3/5 xl:w-2/3 h-auto object-contain transition-all duration-500" />
      </div>

      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <h3 className="text-center text-secondary text-4xl font-semibold text-gray-900 mb-8 sm:mb-12">Log in</h3>

        <div className="w-full sm:w-[350px] mb-6">
          <input
            type="text"
            name="userEmail"
            placeholder="Email"
            value={userEmail}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${emailError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-900"}`}
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>

        <div className="w-full sm:w-[350px] mb-6">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="userPassword"
              placeholder="Password"
              value={userPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 transition duration-300 ease-in-out ${passwordError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-gray-900"}`}
            />
            <button type="button" onClick={togglePasswordVisibility} className="absolute right-3 top-2 text-gray-600">
              {showPassword ? <AiOutlineEyeInvisible className="text-lg" /> : <AiOutlineEye className="text-lg" />}
            </button>
          </div>
          {passwordError && <p className="text-red-500 text-xs mt-1">{passwordError}</p>}
        </div>

        <button onClick={handleLogin} className={`w-full sm:w-[350px] py-3 mb-6 bg-gray-900 text-white text-base rounded-md hover:bg-black transition ease-in-out duration-300 ${loading && "cursor-not-allowed"}`} disabled={loading}>
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Log in"}
        </button>

        <p className="w-full sm:w-[350px] text-sm mb-1 text-gray-600 text-left">
          Don&apost have an account? <Link to="/register" className="font-semibold text-gray-900 hover:underline">Sign up</Link>
        </p>

        <Link to="/" className="fixed top-5 left-5 bg-white p-3 rounded-full shadow-md hover:bg-gray-100">
          <AiOutlineHome className="text-2xl text-gray-600" />
        </Link>
      </div>
    </div>
  );
};

export default Login;
