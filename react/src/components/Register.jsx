import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import SignupImage from "../assets/signup.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
    userAddress: "",
    userPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateEmail = email => /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email);
  const validatePassword = password => password.length >= 6;

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { userName, userEmail, userPassword } = formData;

    let validationErrors = {};

    if (!userName.trim()) validationErrors.userName = "Name is required.";
    if (!validateEmail(userEmail)) validationErrors.userEmail = "Invalid email.";
    if (!validatePassword(userPassword)) validationErrors.userPassword = "Password must be at least 6 characters.";
    if (!isAccepted) validationErrors.accept = "You must accept the terms.";

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/registeruser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        navigate("/profile");
      } else {
        alert("Registration failed.");
      }
    } catch (error) {
      alert("Error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-50">
      <Link to="/" className="fixed top-5 left-5 bg-gray-200 p-3 rounded-full shadow-md">
        <AiOutlineHome className="text-2xl text-gray-600" />
      </Link>
      <div className="lg:w-1/2 w-full flex justify-center items-center p-4">
        <img src={SignupImage} alt="Signup" className="w-4/5 object-contain" />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col justify-center items-center p-8">
        <h3 className="text-4xl font-semibold text-gray-900 mb-8">Sign up</h3>
        <input
          name="userName"
          type="text"
          placeholder="Full Name"
          value={formData.userName}
          onChange={handleChange}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md"
        />
        <input
          name="userEmail"
          type="email"
          placeholder="Email"
          value={formData.userEmail}
          onChange={handleChange}
          className={`w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md ${errors.userEmail && "border-red-500"}`}
        />
        {errors.userEmail && <p className="text-red-500">{errors.userEmail}</p>}
        <input
          name="userPhone"
          type="tel"
          placeholder="Phone Number"
          value={formData.userPhone}
          onChange={handleChange}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md"
        />
        <input
          name="userAddress"
          type="text"
          placeholder="Address"
          value={formData.userAddress}
          onChange={handleChange}
          className="w-full sm:w-[350px] px-4 py-3 mb-6 border rounded-md"
        />
        <div className="relative w-full sm:w-[350px] mb-6">
          <input
            name="userPassword"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={formData.userPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-md ${errors.userPassword && "border-red-500"}`}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-2">
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </button>
        </div>
        {errors.userPassword && <p className="text-red-500">{errors.userPassword}</p>}
        <div className="mb-6 w-full sm:w-[350px] text-sm">
          <label>
            <input
              type="checkbox"
              checked={isAccepted}
              onChange={() => setIsAccepted(!isAccepted)}
              className="mr-2"
            />
            I accept the terms.
          </label>
          {errors.accept && <p className="text-red-500">{errors.accept}</p>}
        </div>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full sm:w-[350px] py-3 mb-6 bg-gray-900 text-white rounded-md"
        >
          {loading ? <ClipLoader size={20} color="#ffffff" /> : "Sign up"}
        </button>
        <Link to="/login" className="text-sm text-gray-600">Already have an account? Log in</Link>
      </div>
    </div>
  );
};

export default Signup;
