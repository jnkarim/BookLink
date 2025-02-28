import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Explore from "../pages/Explore.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx";
import AboutUs from "../components/AboutUs.jsx";
import ContactUs from "../components/ContactUs.jsx";
import Settings from "../pages/Settings.jsx";
import Profile from "../pages/Profile.jsx";
import BookUpload from "../pages/BookUpload.jsx";
import Chat from "../pages/Chat.jsx";

import AdminDashboard from "../admin/Dashboard.jsx";
import PendingBooks from "../admin/PendingBooks.jsx";
import PendingRequests from "../admin/PendingRequests.jsx";
import ExchangeRecords from "../admin/ExchangeRecords.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";
import AdminLogin from "../admin/AdminLogin.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/explore", element: <Explore /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/book/:id", element: <BookDetails /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/profile", element: <Profile /> },
      { path: "/chat", element: <Chat /> },
      { path: "/settings", element: <Settings /> },
      { path: "/privacy", element: <PrivacyPolicy /> },
      { path: "/about", element: <AboutUs /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/upload-book", element: <BookUpload /> },

      // Admin Routes
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: "pending-books", element: <PendingBooks /> },
          { path: "pending-requests", element: <PendingRequests /> },
          { path: "exchange-records", element: <ExchangeRecords /> },
        ],
      },
      { path: "/admin/login", element: <AdminLogin /> }, // Admin Login Route
    ],
  },
]);

export default router;
