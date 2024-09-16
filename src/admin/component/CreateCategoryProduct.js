import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateCategoryProduct = () => {
  const [productName, setProductName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('small');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0); // To track upload progress
  const [products, setProducts] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [productId, setProductId] = useState(null);

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to fetch categories');
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/products/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
    }
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const category = categories.find((cat) => cat.name === selectedCategory);
  
    if (!category) {
      toast.error('Please select a valid category');
      return;
    }
  
    const formData = new FormData();
    formData.append('name', productName);
    formData.append('category', category._id);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('description', description);
  
    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });
  
    try {
      await axios.post(`https://bcom-backend.onrender.com/api/products/${category._id}/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });
      toast.success('Product created successfully!');
      fetchProducts();
      resetForm();
    } catch (error) {
      console.error('Error creating/updating product:', error);
      toast.error('Failed to create/update product');
    }
  };

  const resetForm = () => {
    setProductName('');
    setSelectedCategory('');
    setPrice('');
    setSize('small');
    setDescription('');
    setImages([]);
    setUploadProgress(0); // Reset progress bar after form reset
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setProductId(product._id);
    setProductName(product.name);
    setSelectedCategory(product.category.name);
    setPrice(product.price);
    setSize(product.size);
    setDescription(product.description);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://bcom-backend.onrender.com/api/products/products/${id}`);
        toast.success('Product deleted successfully!');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full mb-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {editMode ? 'Update Product' : 'Create Product'}
        </h2>

        <form onSubmit={handleSubmit} className="mb-8 space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Price (₹)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              required
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
              <option value="xl">XL</option>
              <option value="xxl">XXL</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              placeholder="Enter product description"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold flex items-center">
              Upload Product Images
              {/* Show upload progress next to the label */}
              {uploadProgress > 0 && (
                <span className="ml-4 text-blue-500">{uploadProgress}%</span>
              )}
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-gray-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {editMode ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">
          Product List
        </h3>
        {products.length === 0 ? (
          <p className="text-gray-600 text-center">No products available.</p>
        ) : (
          <ul>
            {products.map((product) => (
              <li
                key={product._id}
                className="flex justify-between items-center bg-gray-100 p-4 mb-4 rounded-lg shadow-sm hover:shadow-md transition"
              >
                <span className="text-gray-700">
                  {product.name} - ₹{product.price} - {product.size}
                </span>
                <div>
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
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
  );
};

export default CreateCategoryProduct;
