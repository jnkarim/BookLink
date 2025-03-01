import { createRoot } from "react-dom/client";
import "./index.css";
import "sweetalert2/src/sweetalert2.scss";

import { AuthProvider } from "../src/utils/context/AuthContext.jsx";
import { RouterProvider } from "react-router-dom"; // Correct import
import router from "./routers/router.jsx";

import { Provider } from "react-redux";
import { store } from "./redux/store.js";

// Render the app
createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
);
