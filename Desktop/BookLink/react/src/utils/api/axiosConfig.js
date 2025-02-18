import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api", // Set your API's base URL here
    timeout: 10000, // Optional: timeout for requests in milliseconds
    headers: {
        "Content-Type": "application/json", // Default headers for all requests
    },
});

// Request Interceptor (Optional)
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken"); // Get the token from localStorage
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // Add token to Authorization header
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor (Optional)
axiosInstance.interceptors.response.use(
    (response) => response, // Handle successful responses
    (error) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized errors (e.g., token expired)
            alert("Session expired. Please log in again.");
            window.location.href = "/login"; // Redirect to login page
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
