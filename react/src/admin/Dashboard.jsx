import React from 'react';
import { BookOpen, Users, RefreshCw, Clock } from 'lucide-react';

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
  const stats = [
    { title: 'Total Books', value: 156, icon: BookOpen, color: 'bg-blue-500' },
    { title: 'Active Users', value: 42, icon: Users, color: 'bg-green-500' },
    { title: 'Books Exchanged', value: 89, icon: RefreshCw, color: 'bg-purple-500' },
    { title: 'Pending Returns', value: 12, icon: Clock, color: 'bg-yellow-500' },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
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
              {[1, 2, 3, 4, 5].map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">New book request</td>
                  <td className="px-6 py-4">The Great Gatsby</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">2024-03-15</td>
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
