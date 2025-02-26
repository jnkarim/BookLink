import React, { useState, useEffect } from "react";
import { BookOpen, Users, RefreshCw, Clock, Hourglass } from 'lucide-react';
import axios from "axios";

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total_books: 0,
    active_users: 0,
    books_exchanged: 0,
    pending_returns: 0,
    pending_books: 0, // New state for books with pending status
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/stats');
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchRecentActivities = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/recent-activities');
        setRecentActivities(response.data);
      } catch (error) {
        console.error("Error fetching recent activities:", error);
      }
    };

const fetchPendingBooks = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/books');
    
    console.log("API Response:", response.data); // Debugging

    if (Array.isArray(response.data)) {
      const pendingBooks = response.data.filter(book => book.available_status === "Pending");
      
      console.log("Filtered Pending Books:", pendingBooks); // Debugging

      setStats(prevStats => ({ ...prevStats, pending_books: pendingBooks.length }));
    } else {
      console.error("Error: Expected an array but got:", response.data);
    }
  } catch (error) {
    console.error("Error fetching pending books:", error);
  }
};

    fetchStats();
    fetchRecentActivities();
    fetchPendingBooks();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Books"
          value={stats.total_books}
          icon={BookOpen}
          color="bg-blue-500"
        />
        <StatCard
          title="Active Users"
          value={stats.active_users}
          icon={Users}
          color="bg-green-500"
        />
        <StatCard
          title="Books Exchanged"
          value={stats.books_exchanged}
          icon={RefreshCw}
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Returns"
          value={stats.pending_returns}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Pending Books"
          value={stats.pending_books}
          icon={Hourglass}
          color="bg-red-500"
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Activities</h3>
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentActivities.map((activity, index) => (
                <tr key={index}>
                  <td className="px-6 py-4">{activity.action}</td>
                  <td className="px-6 py-4">{activity.bookTitle}</td>
                  <td className="px-6 py-4">{activity.userName}</td>
                  <td className="px-6 py-4">{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
