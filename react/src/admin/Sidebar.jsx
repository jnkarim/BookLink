import React from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import { BookOpen, Users, RefreshCw, LayoutDashboard, LogOut } from 'lucide-react';

function Sidebar({ onLogout }) {
  const location = useLocation(); // Get current URL path

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard />, path: '/admin' },
    { id: 'pending-books', label: 'Pending Books', icon: <BookOpen />, path: '/admin/pending-books' },
    { id: 'pending-requests', label: 'Pending Requests', icon: <Users />, path: '/admin/pending-requests' },
    { id: 'exchange-records', label: 'Exchange Records', icon: <RefreshCw />, path: '/admin/exchange-records' },
  ];

  return (
    <div className="w-64 min-h-screen p-4 flex flex-col" style={{ backgroundColor: '#f0eee2' }}>
      {/* Sidebar Header */}
      <div className="flex items-center gap-2 mb-8 text-gray-800">
        <BookOpen className="w-8 h-8" />
        <h1 className="text-xl font-bold">BookLink Admin</h1>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors text-gray-900 ${
              location.pathname === item.path ? 'bg-blue-600 text-white' : 'hover:bg-gray-300'
            }`}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-600 transition-colors mt-4 text-gray-900"
      >
        <LogOut />
        <span>Logout</span>
      </button>
    </div>
  );
}

export default Sidebar;
