import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]); // State to store blogs
  const [error, setError] = useState(null); // State to handle errors
  const [loading, setLoading] = useState(true); // State to handle loading

  const token = Cookies.get("token"); // Check if the user is logged in

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/blogs", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass token in headers if logged in
          },
        });
        setBlogs(response.data); // Set the blogs data
        setLoading(false); // Set loading to false
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError("Failed to fetch blogs. Please try again later.");
        setLoading(false); // Set loading to false
      }
    };

    if (token) {
      fetchBlogs();
    } else {
      setLoading(false); // Stop loading if not logged in
    }
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-gray-300">Loading blogs...</p>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4">You are not logged in</h2>
          <p className="text-gray-400 mb-6">Please log in to view your blogs.</p>
          <div className="space-x-4">
            <Link
              to="/login"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-500">Your Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-center text-gray-400">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="p-4 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold text-blue-400">{blog.title}</h3>
                <p className="text-gray-300 mt-2 line-clamp-3">{blog.content}</p>
                <p className="text-sm text-gray-500 mt-4">
                  Created on: {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;