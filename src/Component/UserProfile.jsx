import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode'; // ✅ correct named import
import Cookies from 'js-cookie';

const UserProfile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [error, setError] = useState(null); // State to handle errors

  useEffect(() => {
    const token = Cookies.get('token'); // Retrieve the token from cookies
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded Token:', decoded); // Debugging log
        setUser(decoded);
      } catch (err) {
        console.error('Invalid token:', err); // Log the error
        setError('Invalid token. Please log in again.');
      }
    } else {
      setError('No token found. Please log in.'); // Handle missing token
    }
  }, []);

  if (error) {
    // Display an error message if there's an issue with the token
    return (
      <div className="text-center p-4">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!user) {
    // Display a loading message while the user data is being fetched
    return (
      <div className="text-center p-4">
        <p className="text-gray-500">Loading user profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
      <div className="space-y-2">
        <p><strong>Name:</strong> {user.name || 'N/A'}</p>
        <p><strong>Email:</strong> {user.email || 'N/A'}</p>
        <p><strong>Role:</strong> {user.role || 'N/A'}</p>
      </div>
    </div>
  );
};

export default UserProfile;