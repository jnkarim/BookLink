
import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';

function AdminLayout() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // For preview purposes, set to true
  const [activeTab, setActiveTab] = useState('dashboard');

  // For preview purposes, we'll skip the authentication check
  // In production, you would check if the admin is actually logged in
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={() => setIsAuthenticated(false)}
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;