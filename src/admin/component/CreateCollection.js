import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCollection = () => {
  const [name, setName] = useState('');
  const [collections, setCollections] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [collectionId, setCollectionId] = useState(null);

  // Fetch all collections when the component mounts
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/collections');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
      toast.error('Failed to fetch collections');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update collection
      try {
        await axios.put(`https://bcom-backend.onrender.com/api/collections/${collectionId}`, { name });
        toast.success('Collection updated successfully!');
        setEditMode(false);
        setCollectionId(null);
      } catch (error) {
        console.error('Error updating collection:', error);
        toast.error('Failed to update collection');
      }
    } else {
      // Create collection
      try {
        await axios.post('https://bcom-backend.onrender.com/api/collections', { name });
        toast.success('Collection created successfully!');
      } catch (error) {
        console.error('Error creating collection:', error);
        toast.error('Failed to create collection');
      }
    }

    setName('');
    fetchCollections(); // Refresh the list after creating/updating
  };

  const handleEdit = (collection) => {
    setEditMode(true);
    setCollectionId(collection._id);
    setName(collection.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this collection?')) {
      try {
        await axios.delete(`https://bcom-backend.onrender.com/api/collections/${id}`);
        toast.success('Collection deleted successfully!');
        fetchCollections(); // Refresh the list after deleting
      } catch (error) {
        console.error('Error deleting collection:', error);
        toast.error('Failed to delete collection');
      }
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-2xl max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          {editMode ? 'Edit Collection' : 'Create Collection'}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-lg">Collection Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-transparent focus:border-purple-500 bg-transparent  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter collection name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 hover:bg-purple-600 transition-transform duration-300"
          >
            {editMode ? 'Update Collection' : 'Create Collection'}
          </button>
        </form>

        <div className="bg-gradient-to-r from-purple-800 to-blue-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Collection List</h3>
          {collections.length === 0 ? (
            <p className="text-white text-opacity-75">No collections available.</p>
          ) : (
            <ul>
              {collections.map((collection) => (
                <li
                  key={collection._id}
                  className="flex justify-between items-center bg-white/20 p-3 mb-3 rounded-lg shadow-md hover:bg-white/40 transition duration-300"
                >
                  <span className="text-white">{collection.name}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(collection)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(collection._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCollection;
