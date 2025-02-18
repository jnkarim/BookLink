import React from 'react';
import { Check, X } from 'lucide-react';

const PendingBooks = () => {
  const pendingBooks = [
    {
      id: 1,
      title: "1984",
      author: "George Orwell",
      owner: "Alice Smith",
      condition: "Good",
      requestDate: "2024-03-15",
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=200"
    },
    // Add more mock data as needed
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Pending Book Approvals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pendingBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={book.image} alt={book.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{book.title}</h3>
              <p className="text-gray-600">by {book.author}</p>
              <div className="mt-2">
                <p><span className="font-medium">Owner:</span> {book.owner}</p>
                <p><span className="font-medium">Condition:</span> {book.condition}</p>
                <p><span className="font-medium">Request Date:</span> {book.requestDate}</p>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 bg-green-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-green-600">
                  <Check size={18} />
                  Approve
                </button>
                <button className="flex-1 bg-red-500 text-white py-2 rounded-md flex items-center justify-center gap-2 hover:bg-red-600">
                  <X size={18} />
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingBooks;