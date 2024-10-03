import React, { useEffect, useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import Footer from "./Footer";
import CollectionBanner from "./CollectionBanner";

const CollectionProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("");
  const [hoveredImage, setHoveredImage] = useState({}); // State to manage hovered image

  useEffect(() => {
    const fetchCollectionAndProducts = async () => {
      try {
        // Fetch Collection Details
        const collectionResponse = await fetch(
          `https://bcom-backend.onrender.com/api/collections/${id}`
        );
        if (!collectionResponse.ok) {
          throw new Error("Failed to fetch collection details");
        }
        const collectionData = await collectionResponse.json();
        setCollectionName(collectionData.name);

        // Fetch Products for the Collection
        const productsResponse = await fetch(
          `https://bcom-backend.onrender.com/api/collection-products/${id}/products`
        );
        if (!productsResponse.ok) {
          throw new Error("Failed to fetch products");
        }
        const productsData = await productsResponse.json();
        setProducts(productsData);
        setFilteredProducts(productsData);
      } catch (error) {
        setError("Error fetching collection products");
        console.error("Error fetching collection products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCollectionAndProducts();
  }, [id]);

  const handleSort = (option) => {
    let sortedProducts = [...products];

    if (option === "atoz") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (option === "ztoa") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (option === "newtoold") {
      sortedProducts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      ); // Sort New to Old
    } else if (option === "prizehightolow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (option === "prizelowtohigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    }

    setFilteredProducts(sortedProducts);
    setSortOption(option);
  };

  return (
    <>
      <div className="mt-24 font-indif font-semibold">
        <CollectionBanner />
        <h2 className="text-xl font-bold ml-7">
          Collection's:{" "}
          {collectionName ? `${collectionName} ` : "Collection Products"}
        </h2>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        {/* Sort/Filter Dropdown */}
        <div className="ml-7 mt-5">
          <label htmlFor="sort" className="font-semibold">
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

        <div className="flex flex-wrap gap-6 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="relative group ml-7 p-4 rounded-sm w-72 h-100"
            >
              {/* Product Image */}
              <div className="relative w-72 overflow-hidden rounded-sm">
                {product.images && product.images.length > 0 && (
                  <Link to={`/product/${product._id}`}>
                    <img
                      src={hoveredImage[product._id] || product.images[0]} // Use hovered image or default to the first image
                      alt={product.name}
                      className="w-72 h-96 object-cover transform transition-transform duration-300 group-hover:scale-105"
                      onMouseEnter={() =>
                        setHoveredImage({ [product._id]: product.images[1] })
                      } // Set to second image on hover
                      onMouseLeave={() => setHoveredImage({})} // Reset on mouse leave
                    />
                  </Link>
                )}

                {/* Quick Buy Button */}
                <Link to={`/product/${product._id}`}>
                  <button className="absolute font-gara bottom-2 w-full left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white px-4 py-2 text-black font-bold shadow-md">
                    Quick Buy
                  </button>
                </Link>

                {/* Ready to Ship */}
                {/* <span className="absolute top-2 font-gara right-2 bg-white text-red-500 px-3 py-1 rounded">
                  Ready To Ship
                </span> */}
              </div>

              {/* Product Info */}
              <h3 className="text-lg font-bold mt-4">{product.name}</h3>
              <p className="text-sm text-gray-600 font-gara">
                {product.description}
              </p>
              <p className="text-sm text-gray-800 font-semibold font-gara">
                Price: Rs. {product.price}
              </p>
              <p className="text-sm text-gray-800 font-gara">
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

export default CollectionProducts;
