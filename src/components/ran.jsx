import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchBarRef = useRef(null);

  // Fetch products from both APIs based on search query
  const fetchProducts = async (query) => {
    try {
      // Fetch from first API
      const [response1, response2] = await Promise.all([
        fetch(`https://bcom-backend.onrender.com/api/products/products?name=${query}`),
        fetch(`https://bcom-backend.onrender.com/api/collection-products/products?name=${query}`)
      ]);

      const data1 = await response1.json();
      const data2 = await response2.json();

      // Combine both API results
      const combinedResults = [...data1, ...data2];

      // Filter products where the name matches the search query (ignoring case)
      const filteredResults = combinedResults.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Only fetch products if query is longer than 2 characters
    if (query.length > 2) {
      fetchProducts(query);
    } else {
      setSearchResults([]); // Clear search results if the query is too short
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.length > 2) {
      fetchProducts(searchQuery); // Fetch products when the search is submitted
    }
  };

  return (
    <div>
      <div className="navbar">
        <div className="search-bar-container">
          <FontAwesomeIcon
            icon={faSearch}
            className="cursor-pointer text-xl"
            onClick={() => setShowSearchBar(true)}
          />
          {showSearchBar && (
            <div className="search-bar bg-white p-2" ref={searchBarRef}>
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  placeholder="Search products..."
                  className="p-2 w-full border"
                />
                <button type="submit" className="bg-[#cdac99] text-white p-2 ml-2">
                  Search
                </button>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="text-xl cursor-pointer ml-2"
                  onClick={() => setShowSearchBar(false)}
                />
              </form>
            </div>
          )}
        </div>

        {/* Display search results */}
        {searchResults.length > 0 && (
          <div className="search-results grid grid-cols-3 gap-4 mt-4">
            {searchResults.map((product) => (
              <div key={product._id} className="product-card p-4 shadow-lg">
                <img src={product.image} alt={product.name} className="w-full" />
                <h3 className="text-xl mt-2">{product.name}</h3>
                <p className="text-gray-700">{product.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
