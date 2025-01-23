import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import Explore from "../pages/Explore.jsx";
import CartPage from "../pages/books/CartPage.jsx";
import BookDetails from "../pages/BookDetails.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>, //parent wrapper

    /*Specifies nested routes. will render inside the <App />*/
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/explore",
        element:<Explore/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      {
        path: "/book/:_id",
        element: <BookDetails />,
      },
      {
        path: "/cart",
        element: <div>Orders</div>,
      },

    ],
  },
]);

export default router;
