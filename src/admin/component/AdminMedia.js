import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminMedia = () => {
  const [mediaFiles, setMediaFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [mediaType, setMediaType] = useState('image');
  const [loading, setLoading] = useState(false);

  // Fetch all media files on component mount
  useEffect(() => {
    fetchMediaFiles();
  }, []);

  // Function to fetch media files from backend
  const fetchMediaFiles = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/media/all');
      setMediaFiles(response.data);
    } catch (error) {
      console.error('Error fetching media files:', error);
    }
  };

  // Function to handle file upload
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', mediaType); // Image or Video

    try {
      setLoading(true);
      const response = await axios.post('https://bcom-backend.onrender.com/api/media/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchMediaFiles(); // Refresh the media files after upload
    } catch (error) {
      console.error('Error uploading media:', error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle file delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://bcom-backend.onrender.com/api/media/${id}`);
      fetchMediaFiles(); // Refresh the media files after deletion
    } catch (error) {
      console.error('Error deleting media:', error);
    }
  };

  return (
    <div className="ml-64 mt-24 container mx-auto p-6 bg-gray-50 min-h-screen rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-700 mb-6 text-center">Admin Media Management</h1>

      {/* Upload Form */}
      <form onSubmit={handleFileUpload} className="mb-6 space-y-4">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">Upload Photo or Video</label>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={(e) => setFile(e.target.files[0])}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full text-gray-700 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-600">Select Media Type</label>
          <select
            value={mediaType}
            onChange={(e) => setMediaType(e.target.value)}
            className="mt-2 p-3 border border-gray-300 rounded-lg w-full text-gray-700 focus:outline-none focus:border-blue-500"
          >
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
        </div>

        <button
          type="submit"
          className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out ${
            loading && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>

      {/* Display Media Files */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mediaFiles.map((media) => (
          <div key={media._id} className="relative border border-gray-300 p-4 rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 ease-in-out">
            {media.type === 'image' ? (
              <img src={media.url} alt="Uploaded" className="w-full h-48 object-cover rounded-lg" />
            ) : (
              <video src={media.url} controls className="w-full h-48 object-cover rounded-lg" />
            )}

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(media._id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300 ease-in-out"
            >
              &#10005;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminMedia;
