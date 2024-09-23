import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCollection = () => {
  const [name, setName] = useState("");
  const [collections, setCollections] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [collectionId, setCollectionId] = useState(null);

  // Fetch all collections when the component mounts
  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const response = await axios.get(
        "https://bcom-backend.onrender.com/api/collections"
      );
      setCollections(response.data);
    } catch (error) {
      console.error("Error fetching collections:", error);
      toast.error("Failed to fetch collections");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update collection
      try {
        await axios.put(
          `https://bcom-backend.onrender.com/api/collections/${collectionId}`,
          { name }
        );
        toast.success("Collection updated successfully!");
        setEditMode(false);
        setCollectionId(null);
      } catch (error) {
        console.error("Error updating collection:", error);
        toast.error("Failed to update collection");
      }
    } else {
      // Create collection
      try {
        await axios.post("https://bcom-backend.onrender.com/api/collections", {
          name,
        });
        toast.success("Collection created successfully!");
      } catch (error) {
        console.error("Error creating collection:", error);
        toast.error("Failed to create collection");
      }
    }

    setName("");
    fetchCollections(); // Refresh the list after creating/updating
  };

  const handleEdit = (collection) => {
    setEditMode(true);
    setCollectionId(collection._id);
    setName(collection.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this collection?")) {
      try {
        await axios.delete(
          `https://bcom-backend.onrender.com/api/collections/${id}`
        );
        toast.success("Collection deleted successfully!");
        fetchCollections(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting collection:", error);
        toast.error("Failed to delete collection");
      }
    }
  };

  return (
    <div className="mt-24 flex flex-col items-center justify-center w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {editMode ? "Edit Collection" : "Create Collection"}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">
              Collection Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter collection name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {editMode ? "Update Collection" : "Create Collection"}
          </button>
        </form>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Collection List
          </h3>
          {collections.length === 0 ? (
            <p className="text-gray-600">No collections available.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 ">
              {collections.map((collection) => (
                <li
                  key={collection._id}
                  className="flex justify-between gap-2 items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-300 w-64"
                >
                  <span className="text-gray-800">{collection.name}</span>
                  <div className="flex ">
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
