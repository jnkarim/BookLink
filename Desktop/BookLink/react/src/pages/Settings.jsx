import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Settings = () => {
  const [user, setUser] = useState({ name: '', email: '', password: '' , address: ''});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://127.0.0.1:8000/api/user', {
          headers: { Authorization: `Bearer ${token}` }, ////The Authorization header includes the token you got earlier
                                                        // to tell the server, "I’m logged in and allowed to view this data.
        });
        setUser(response.data); //If the request is successful, it gets the user data from the server (stored in response.data)
                                //, and then sets that data in your state using setUser
      } catch (err) {
        setError('Failed to load user data');
      }
    };
    fetchUserData(); //This is calling the function you defined earlier, which fetches the user data from the server.
  }, []);

  const handleChange = (e) => { //e is the event object that gets passed automatically when an event happens (like a change in an input field)
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value })); //name is the name of the input field (e.g., username, email)
                                                    //[name] is used to dynamically set the property name. It will look up the input field's name and update that in the new value.
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      await axios.put('http://127.0.0.1:8000/api/user/update', user, {
        headers: { Authorization: `Bearer ${token}` }, 
      });
      alert('Your profile updated successfully!');
    } catch (err) {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  return (
    <div className="flex justify-center my-8 py-8">
      <div className="bg-[#fdfcf7] p-6 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Settings</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}


        <form onSubmit={handleSubmit} className="space-y-8 ">
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your name" // Placeholder text inside the input box
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Address</label>
            <input
              type="text"
              name="address"
              value={user.address}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter updated address"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-semibold">Update Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              placeholder="Enter a new password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-900 hover:bg-red-600 text-white py-2 rounded-full hover:bg-black transition duration-300"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
