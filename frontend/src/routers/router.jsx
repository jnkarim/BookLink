import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Explore from "../pages/Explore.jsx";
import BookDetails from "../pages/books/BookDetails.jsx";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx";
import AboutUs from "../components/AboutUs.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Settings from "../pages/Settings.jsx";
import Profile from "../pages/Profile.jsx";
import BookUpload from "../pages/books/BookUpload.jsx";

import AdminDashboard from "../admin/Dashboard.jsx";
import PendingBooks from "../admin/PendingBooks.jsx";
import PendingRequests from "../admin/PendingRequests.jsx";
import ExchangeRecords from "../admin/ExchangeRecords.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";
import AdminLogin from "../admin/AdminLogin.jsx"; // Admin Login Component

import UserProfile from "../pages/UserProfile.jsx";
import ExchangeReq from "../pages/ExchangeReq.jsx";

// Function to check if admin is authenticated (Example)
const isAdminAuthenticated = !!localStorage.getItem("adminToken"); // Replace with real auth logic

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <Home /> },
            { path: "/explore", element: <Explore /> },
            { path: "/login", element: <Login /> },
            { path: "/register", element: <Register /> },
            { path: "/book/:id", element: <BookDetails /> }, // Fix the path to be consistent with Profile link
            { path: "/user/:id", element: <UserProfile /> },
            { path: "/profile", element: <Profile /> },
            { path: "/settings", element: <Settings /> },
            { path: "/privacy", element: <PrivacyPolicy /> },
            { path: "/about", element: <AboutUs /> },
            { path: "/contact", element: <ContactUs /> },
            { path: "/upload-book", element: <BookUpload /> },
            { path: "/cart", element: <ExchangeReq/> },
        ],
    },

    // Redirect "/admin" based on authentication
    {
        path: "/admin",
        element: (
            <Navigate
                to={isAdminAuthenticated ? "/admin/dashboard" : "/admin/login"}
                replace
            />
        ),
    },

    // Admin Login Page
    { path: "/admin/login", element: <AdminLogin /> },

    // Protected Admin Routes (Require AdminLayout)
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            { path: "dashboard", element: <AdminDashboard /> },
            { path: "pending-books", element: <PendingBooks /> },
            { path: "pending-requests", element: <PendingRequests /> },
            { path: "exchange-records", element: <ExchangeRecords /> },
        ],
    },

    // Fallback route if no other match is found
    { path: "*", element: <Navigate to="/" /> },
]);

export default router;
