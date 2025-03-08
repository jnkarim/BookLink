import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import { BookOpen, Users, RefreshCw, LayoutDashboard, LogOut } from "lucide-react";

function Sidebar({ onLogout }) {
  const location = useLocation();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard />, path: "/admin" },
    { id: "pending-books", label: "Pending Books", icon: <BookOpen />, path: "/admin/pending-books" },
    { id: "pending-requests", label: "Pending Requests", icon: <Users />, path: "/admin/pending-requests" },
    { id: "exchange-records", label: "Exchange Records", icon: <RefreshCw />, path: "/admin/exchange-records" },
  ];

  return (
    <div className="w-72 min-h-screen flex flex-col bg-gray-900 text-white shadow-lg px-8 py-12 -m-6">
      {/* Sidebar Header */}
      <div className="flex items-center gap-3 mb-6 px-2">
        <BookOpen className="w-8 h-8 text-green-500" />
        <h1 className="text-xl font-bold">BookLink Admin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all font-medium ${
              location.pathname === item.path
                ? "bg-red-500 text-white shadow-md"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-4 px-4 py-3 rounded-lg transition-all text-gray-300 hover:bg-red-600 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
