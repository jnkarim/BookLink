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
        element: <Profile/>,
      },
      {
        path: "/chat",
        element: <div>Chat Page</div>,
      },
      {
        path: "/settings",
        element: <Settings/>,
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
    ],
  },
]);

export default router;
