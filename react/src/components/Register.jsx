import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";
import { AiOutlineHome, AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import SignupImage from "../assets/signup.png";

const Signup = () => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPhone, setUserPhone] = useState("");
    const [userAddress, setUserAddress] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const signup = async (e) => {
        e.preventDefault();

        const item = {
            name: userName,
            email: userEmail,
            address: userAddress,
            phone: userPhone,
            password: userPassword,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/registeruser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(item),
            });

            const data = await response.json();
            if (data.token) {
                alert(data.message);
            } else {
                alert("TRY AGAIN!");
            }
        } catch (error) {
            console.error("Error during signup:", error);
            alert("An error occurred. Please try again later.");
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
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Email Input */}
                <input
                    type="email"
                    placeholder="Email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Phone Number Input */}
                <input
                    type="tel"
                    placeholder="Phone Number"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Address Input */}
                <input
                    type="text"
                    placeholder="Address"
                    value={userAddress}
                    onChange={(e) => setUserAddress(e.target.value)}
                    className="w-full sm:w-[300px] mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                />

                {/* Password Input */}
                <div className="relative w-full sm:w-[300px] mb-6">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (at least 6 characters)"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
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

                {/* Terms and Conditions Checkbox */}
                <div className="mb-6">
                    <label className="flex items-center text-sm">
                        <input
                            type="checkbox"
                            checked={isAccepted}
                            onChange={(e) => setIsAccepted(e.target.checked)}
                            className="mr-2"
                        />
                        I agree to the {" "}
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
                    Already have an account? {" "}
                    <span className="font-semibold text-blue-500">Log in</span>
                </Link>
            </div>
        </div>
    );
};

export default Signup;
