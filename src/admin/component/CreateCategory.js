import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategory = () => {
  const [name, setName] = useState('');
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // Fetch all categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://e-com-backend-dxii.onrender.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update category
      try {
        await axios.put(`https://e-com-backend-dxii.onrender.com/api/categories/${categoryId}`, { name });
        toast.success('Category updated successfully!');
        setEditMode(false);
        setCategoryId(null);
      } catch (error) {
        console.error('Error updating category:', error);
        toast.error('Failed to update category');
      }
    } else {
      // Create category
      try {
        await axios.post('https://e-com-backend-dxii.onrender.com/api/categories', { name });
        toast.success('Category created successfully!');
      } catch (error) {
        console.error('Error creating category:', error);
        toast.error('Failed to create category');
      }
    }

    setName('');
    fetchCategories(); // Refresh the list after creating/updating
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCategoryId(category._id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      try {
        await axios.delete(`https://e-com-backend-dxii.onrender.com/api/categories/${id}`);
        toast.success('Category deleted successfully!');
        fetchCategories(); // Refresh the list after deleting
      } catch (error) {
        console.error('Error deleting category:', error);
        toast.error('Failed to delete category');
      }
    }
  };

  return (
    <div className="min-h-screen mt-24 flex flex-col items-center justify-center">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <div className="bg-white/30 backdrop-blur-md p-8 rounded-lg shadow-2xl max-w-lg w-full glassmorphism">
        <h2 className="text-3xl font-bold text-center text-white mb-6 bg-gradient-to-r from-blue-300 to-purple-400 bg-clip-text text-transparent">
          {editMode ? 'Edit Category' : 'Create Category'}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-6">
            <label className="block text-black text-lg">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border-2 border-transparent focus:border-purple-500 bg-transparent  rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-300"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:scale-105 hover:bg-purple-600 transition-transform duration-300"
          >
            {editMode ? 'Update Category' : 'Create Category'}
          </button>
        </form>

        <div className="bg-gradient-to-r from-purple-800 to-blue-900 p-4 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-white mb-4">Category List</h3>
          {categories.length === 0 ? (
            <p className="text-white text-opacity-75">No categories available.</p>
          ) : (
            <ul>
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between items-center bg-white/20 p-3 mb-3 rounded-lg shadow-md hover:bg-white/40 transition duration-300"
                >
                  <span className="text-white">{category.name}</span>
                  <div>
                    <button
                      onClick={() => handleEdit(category)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition duration-200 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category._id)}
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

export default CreateCategory;
