import React from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminLayout() {
  // Get admin authentication status from localStorage
  const isAuthenticated = localStorage.getItem('adminToken');
  const navigate = useNavigate();  // Hook for navigation

  if (!isAuthenticated) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="flex min-h-screen bg-[#fdfcf7]">
      <Sidebar
        onLogout={() => {
          localStorage.removeItem('adminToken'); // Remove admin token on logout
          navigate('/admin');  // Use navigate to redirect to login page
        }}
      />
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
