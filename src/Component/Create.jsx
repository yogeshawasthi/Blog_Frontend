import React, { useState } from "react";
import axios from "axios";

const Create = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:8080/api/create", // Replace with your API endpoint
        formData,
        { withCredentials: true }
      );

      alert(response.data.message || "Blog created successfully!");
      console.log(response.data);

      setFormData({
        title: "",
        content: "",
      });
    } catch (err) {
      setError("Error creating blog!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-gray-900 text-white shadow-xl rounded-2xl p-8 border border-gray-700">
        <h2 className="text-2xl font-semibold text-center mb-6 text-blue-500">
          ✍ Create a Blog Post
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter your blog title"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Content</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog content here..."
              rows="5"
              className="mt-1 block w-full px-4 py-2 border border-gray-700 rounded-lg shadow-sm bg-gray-800 text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-all"
          >
            {loading ? "Submitting..." : "Create Blog"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Create;
