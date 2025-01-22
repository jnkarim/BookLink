import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/Home.jsx";
import Login from "../components/Login.jsx";
import Register from "../components/Register.jsx";
import CartPage from "../pages/books/CartPage.jsx";

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
        path: "/orders",
        element: <div>Orders</div>,
      },
      {
        path: "/login",
        element: <div>Orders</div>,
      },
      {
        path: "/register",
        element: <div>Orders</div>,
      },
      {
        path: "/cart",
        element: <div>Orders</div>,
      },
    ],
  },
]);

export default router;
