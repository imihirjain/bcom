import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateEditCollectionProduct = () => {
  const [productName, setProductName] = useState('');
  const [selectedCollection, setSelectedCollection] = useState('');
  const [collections, setCollections] = useState([]);
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('small');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [products, setProducts] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [productId, setProductId] = useState(null); // To store product ID for editing

  // Fetch available collections and all products from the backend when the component mounts
  useEffect(() => {
    fetchCollections();
    fetchProducts();
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

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://bcom-backend.onrender.com/api/collection-products/products');
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

    if (!images.length && !isEditMode) {
      toast.error('Please upload at least one image');
      return;
    }

    const formData = new FormData();
    formData.append('name', productName);
    formData.append('collection', selectedCollection);
    formData.append('price', price);
    formData.append('size', size);
    formData.append('description', description);

    Array.from(images).forEach((image) => {
      formData.append('images', image);
    });

    try {
      const url = isEditMode
        ? `https://bcom-backend.onrender.com/api/collection-products/${selectedCollection}/products/${productId}`
        : `https://bcom-backend.onrender.com/api/collection-products/${selectedCollection}/products`;

      const method = isEditMode ? 'put' : 'post';

      const response = await axios({
        method,
        url,
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(percentCompleted);
        },
      });

      toast.success(isEditMode ? 'Product updated successfully!' : 'Product created successfully!');
      resetForm();
      fetchProducts(); // Refresh product list
    } catch (error) {
      toast.error('Failed to save product');
      console.error(error);
    }
  };

  const resetForm = () => {
    setProductName('');
    setSelectedCollection('');
    setPrice('');
    setSize('small');
    setDescription('');
    setImages([]);
    setUploadProgress(0);
    setIsEditMode(false);
    setProductId(null);
  };

  const handleEdit = (product) => {
    setIsEditMode(true);
    setProductId(product._id);
    setProductName(product.name);
    setSelectedCollection(product.collection._id);
    setPrice(product.price);
    setSize(product.size);
    setDescription(product.description);
  };

  const handleDelete = async (collectionId, productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`https://bcom-backend.onrender.com/api/collection-products/${collectionId}/products/${productId}`);
        toast.success('Product deleted successfully!');
        fetchProducts(); // Refresh product list
      } catch (error) {
        toast.error('Failed to delete product');
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-10">
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} />

      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          {isEditMode ? 'Edit Collection Product' : 'Create Collection Product'}
        </h2>

        {uploadProgress > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}>
              {uploadProgress}%
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Product Name</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Collection</label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              required
            >
              <option value="">Select a collection</option>
              {collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Size</label>
            <select
              value={size}
              onChange={(e) => setSize(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
            <label className="block text-gray-700 text-sm font-semibold">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Enter product description"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-gray-700 text-sm font-semibold">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full text-gray-700"
              required={!isEditMode}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
          >
            {isEditMode ? 'Update Product' : 'Create Product'}
          </button>
        </form>
      </div>

      {/* Product List */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-12">
        <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Product List</h3>
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
                    onClick={() => handleDelete(product.collection._id, product._id)}
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

export default CreateEditCollectionProduct;
