import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Footer from "./Footer";

const CategoryProducts = () => {
  const { id } = useParams(); // Category ID from the URL
  const [products, setProducts] = useState([]); // State for storing products
  const [filteredProducts, setFilteredProducts] = useState([]); // State for filtered products
  const [categoryName, setCategoryName] = useState(""); // State for category name
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status
  const [sortOption, setSortOption] = useState(""); // State for sorting option

  useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      if (!id) {
        setError("Invalid category ID");
        setLoading(false);
        return;
      }

      try {
        // Fetch Category Details
        const categoryResponse = await fetch(
          `https://bcom-backend.onrender.com/api/categories/${id}`
        );
        if (!categoryResponse.ok) {
          throw new Error("Failed to fetch category details");
        }
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.name); // Assuming the category data has a "name" field

        // Fetch Products for the Category
        const productsResponse = await fetch(
          `https://bcom-backend.onrender.com/api/products/${id}/products`
        );
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        setProducts(productsData); // Set products from API response
        setFilteredProducts(productsData); // Initialize filtered products
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false); // Stop loading after fetching is complete
      }
    };

    fetchCategoryAndProducts();
  }, [id]);

  // Function to handle sorting
  const handleSort = (option) => {
    let sortedProducts = [...products];

    if (option === "atoz") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name)); // Sort A to Z by name
    } else if (option === "ztoa") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name)); // Sort Z to A by name
    } else if (option === "newtoold") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort New to Old
    } else if (option === "prizehightolow") {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort Price High to Low
    } else if (option === "prizelowtohigh") {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort Price Low to High
    }

    setFilteredProducts(sortedProducts); // Update the filtered products state with sorted list
    setSortOption(option); // Update the selected sort option
  };

  // Render loading, error, or product grid
  return (
    <>
      <div className="mt-24 font-indif font-semibold">
        <h2 className="text-xl font-bold ml-7 font-indif">
          Category: {categoryName ? `${categoryName} ` : "Category Products"}
        </h2>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        {/* Sort/Filter Dropdown */}
        <div className="ml-7 mt-5">
          <label htmlFor="sort" className="font-semibold font-gara">
            Sort By:
          </label>
          <select
            id="sort"
            className="ml-2 p-2 border font-gara border-gray-300 rounded"
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="">Select</option>
            <option value="atoz">A to Z</option>
            <option value="ztoa">Z to A</option>
            <option value="prizehightolow">Price High to Low</option>
            <option value="prizelowtohigh">Price Low to High</option>
            <option value="newtoold">New to Old</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative group shadow-md ml-7 p-4 bg-white rounded-sm h-full"
            >
              {/* Product Image */}
              <div className="relative w-full overflow-hidden rounded-sm">
                {product.images && product.images.length > 0 && (
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={product.images[0]} // Display the first image
                      alt={product.name}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </Link>
                )}

                {/* Angle Left Icon */}
                <div className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaAngleLeft className="text-3xl cursor-pointer text-white bg-black bg-opacity-50 p-2 " />
                </div>

                {/* Angle Right Icon */}
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FaAngleRight className="text-3xl cursor-pointer text-white bg-black bg-opacity-50 p-2" />
                </div>

                {/* Quick Buy Button */}
                <Link to={`/product/${product._id}`}>
                  <button className="absolute bottom-2 w-full left-1/2 font-gara transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-4 py-2 text-black font-bold shadow-md">
                    Quick Buy
                  </button>
                </Link>

                {/* Ready to Ship */}
                <span className="absolute top-2 right-2 bg-white font-gara text-red-500 px-3 py-1 rounded">
                  Ready To Ship
                </span>
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold font-indif mt-4">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 font-gara">
                {product.description}
              </p>
              <p className="text-sm text-gray-800 font-semibold font-gara">
                Price: Rs. {product.price}
              </p>
              <p className="text-sm font-gara text-gray-800">
                Size: {product.size}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-24">
        <Footer />
      </div>
    </>
  );
};

export default CategoryProducts;
