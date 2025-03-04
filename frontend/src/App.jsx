import "./App.css";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
    const location = useLocation();
    const [loading, setLoading] = useState(false); // Global loading state

    // Define base routes where Navbar should be hidden (works for children too)
    const hiddenNavbarRoutes = ["/admin", "/login", "/register", "/about"];

    // Check if the current path starts with any of the hidden routes
    const shouldShowNavbar = !hiddenNavbarRoutes.some(route =>
        location.pathname.startsWith(route)
    );

    return (
        <div className="flex flex-col min-h-screen bg-[#fdfcf7]">
            {/* Progress Bar (Appears when loading is true) */}
            {loading && (
                <div className="fixed top-0 left-0 w-full h-1 bg-red-500 animate-pulse z-50"></div>
            )}

            {/* Flex Container for Navbar and Main Content */}
            <div className="flex flex-1">
                {/* Conditionally Render Navbar */}
                {shouldShowNavbar && <Navbar />}

                {/* Main Content Area */}
                <main className="flex-1 p-6 font-primary">
                    <Outlet context={{ setLoading }} />
                </main>
            </div>
        </div>
    );
}

export default App;
