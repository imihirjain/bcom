import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [categoryId, setCategoryId] = useState(null);

  // Fetch all categories when the component mounts
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://bcom-backend.onrender.com/api/categories"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to fetch categories");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editMode) {
      // Update category
      try {
        await axios.put(
          `https://bcom-backend.onrender.com/api/categories/${categoryId}`,
          { name }
        );
        toast.success("Category updated successfully!");
        setEditMode(false);
        setCategoryId(null);
      } catch (error) {
        console.error("Error updating category:", error);
        toast.error("Failed to update category");
      }
    } else {
      // Create category
      try {
        await axios.post("https://bcom-backend.onrender.com/api/categories", {
          name,
        });
        toast.success("Category created successfully!");
      } catch (error) {
        console.error("Error creating category:", error);
        toast.error("Failed to create category");
      }
    }

    setName("");
    fetchCategories(); // Refresh the list after creating/updating
  };

  const handleEdit = (category) => {
    setEditMode(true);
    setCategoryId(category._id);
    setName(category.name);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(
          `https://bcom-backend.onrender.com/api/categories/${id}`
        );
        toast.success("Category deleted successfully!");
        fetchCategories(); // Refresh the list after deleting
      } catch (error) {
        console.error("Error deleting category:", error);
        toast.error("Failed to delete category");
      }
    }
  };

  return (
    <div className=" mt-24 flex flex-col items-center justify-center w-full">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />

      <div className="bg-white p-8 rounded-lg shadow-md w-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          {editMode ? "Edit Category" : "Create Category"}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8">
          <div className="mb-4">
            <label className="block text-gray-700 text-lg">Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter category name"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            {editMode ? "Update Category" : "Create Category"}
          </button>
        </form>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Category List
          </h3>
          {categories.length === 0 ? (
            <p className="text-gray-600">No categories available.</p>
          ) : (
            <ul className="grid grid-cols-2 gap-4 ">
              {categories.map((category) => (
                <li
                  key={category._id}
                  className="flex justify-between gap-2 items-center bg-white p-3 rounded-lg shadow-sm border border-gray-200 hover:bg-gray-100 transition duration-300 w-64"
                >
                  <span className="text-gray-800 ">{category.name}</span>
                  <div className="flex ">
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
