import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Explore from "../pages/Explore.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import BookDetails from "../pages/BookDetails.jsx";
import PrivacyPolicy from "../components/PrivacyPolicy.jsx"; // Import PrivacyPolicy page
import AboutUs from "../components/AboutUs.jsx"; // Import AboutUs page
import ContactUs from "../components/ContactUs.jsx"; // Import ContactUs page
import Settings from "../pages/Settings.jsx";
import Profile from "../pages/Profile.jsx";
import BookUpload from "../pages/BookUpload.jsx";


import AdminDashboard from "../admin/Dashboard.jsx";
import PendingBooks from "../admin/PendingBooks.jsx";
import PendingRequests from "../admin/ExchangeRecords.jsx";
import ExchangeRecords from "../admin/PendingRequests.jsx";
import AdminLayout from "../admin/AdminLayout.jsx";
import Sidebar from "../admin/Sidebar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // parent wrapper

    // Specifies nested routes that will render inside <App />
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/explore",
        element: <Explore />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/book-details",
        element: <BookDetails />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/chat",
        element: <div>Chat Page</div>,
      },
      {
        path: "/settings",
        element: <Settings />,
      },

      // Add routes for Privacy Policy, About Us, and Contact Us pages
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/upload-book",
        element: <BookUpload />,
      },
      // Admin Routes

      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "pending-books",
            element: <PendingBooks />,
          },
          {
            path: "Sidebar",
            element: <Sidebar />,
          },
          {
            path: "pending-requests",
            element: <PendingRequests />,
          },
          {
            path: "exchange-records",
            element: <ExchangeRecords />,
          },
        ],
      },


    ],
  },
]);

export default router;
