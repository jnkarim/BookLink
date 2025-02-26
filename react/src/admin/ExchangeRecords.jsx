import React from 'react';
import { Check, X, Calendar } from 'lucide-react';

const PendingRequests = () => {
  const requests = [
    {
      id: 1,
      book: "The Hobbit",
      requester: "John Smith",
      owner: "Mary Johnson",
      requestDate: "2024-03-15",
      returnDate: "2024-04-15",
      status: "pending"
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Exchange Records</h2>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Book</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Requester</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {requests.map((request) => (
              <tr key={request.id}>
                <td className="px-6 py-4">{request.book}</td>
                <td className="px-6 py-4">{request.requester}</td>
                <td className="px-6 py-4">{request.owner}</td>
                <td className="px-6 py-4">{request.requestDate}</td>
                <td className="px-6 py-4">{request.returnDate}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
                      <Check size={18} />
                    </button>
                    <button className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">
                      <X size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PendingRequests;