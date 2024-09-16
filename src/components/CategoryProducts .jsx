import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Footer from "./Footer";

const CategoryProducts = () => {
  const { id } = useParams(); // Category ID from the URL
  const [products, setProducts] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null); // State for error handling
  const [loading, setLoading] = useState(true); // State for loading status

  useEffect(() => {
    const fetchProducts = async () => {
      if (!id) {
        setError("Invalid category ID");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/products/${id}/products`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts(data); // Ensure it's an array before setting state
        } else {
          throw new Error("Unexpected data format");
        }
      } catch (error) {
        setError("Failed to fetch products");
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false); // Stop loading after fetching is complete
      }
    };

    fetchProducts();
  }, [id]);

  return (
    <>
      <div className="mt-24 font-corm font-semibold">
        <h2 className="text-xl font-bold ml-7">Category Products</h2>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          {products.map((product) => (
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
                <button className="absolute bottom-2 w-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-4 py-2 text-black font-bold shadow-md">
                  Quick Buy
                </button>
                </Link>

                {/* Ready to Ship */}
                <span className="absolute top-2 right-2 bg-white text-red-500 px-3 py-1 rounded">
                  Ready To Ship
                </span>
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold mt-4">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="text-sm text-gray-800 font-semibold">
                Price: Rs. {product.price}
              </p>
              <p className="text-sm text-gray-800">Size: {product.size}</p>
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
