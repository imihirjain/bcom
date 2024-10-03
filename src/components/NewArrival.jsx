import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router

const NewArrival = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [combinedItems, setCombinedItems] = useState([]); // To store combined data from both APIs
  const [hoveredItemIndex, setHoveredItemIndex] = useState(null); // For tracking the hovered item for image navigation

  const visibleImages =
    window.innerWidth < 640 ? 1 : window.innerWidth < 768 ? 2 : 3;

  useEffect(() => {
    const fetchCombinedProducts = async () => {
      try {
        const [productsResponse, collectionProductsResponse] =
          await Promise.all([
            fetch("https://bcom-backend.onrender.com/api/products/products"),
            fetch(
              "https://bcom-backend.onrender.com/api/collection-products/products"
            ),
          ]);

        const productsData = await productsResponse.json();
        const collectionProductsData = await collectionProductsResponse.json();

        const combinedData = [...productsData, ...collectionProductsData];
        setCombinedItems(combinedData.slice(0, 10)); // Limiting the array to only 10 items
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchCombinedProducts();
  }, []);

  // Swipe Handling
  const [startX, setStartX] = useState(0);

  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    const currentX = e.touches[0].clientX;
    const diffX = startX - currentX;

    if (diffX > 50) {
      // Swipe left
      nextSlide();
    } else if (diffX < -50) {
      // Swipe right
      prevSlide();
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? combinedItems.length - visibleImages : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === combinedItems.length - visibleImages ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10 sm:py-2 font-indif">
      {/* Text Section */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-[20px] md:text-[25px] mt-[40px] mb-2 font-semibold uppercase">
          Divinity Through Design
        </h2>
        <p className="text-[16px] md:text-[20px] font-gara font-semibold text-gray-600">
          Elegant, Effortless & Handcrafted for Celebrations.
        </p>
      </div>

      {/* Introduction Section with Arrows */}
      <div className="flex items-center justify-center w-full max-w-6xl mb-2 px-4">
        {window.innerWidth >= 640 && ( // Show arrows only on larger screens
          <>
            <button
              className="text-lg md:text-2xl font-bold text-gray-700 bg-white p-2 mb-3 md:mr-1"
              onClick={prevSlide}
            >
              &lt;
            </button>
            <h1 className="text-[20px] md:text-[25px] font-indif mb-2 cursor-pointer font-semibold">
              New Arrival
            </h1>
            <button
              className="text-lg md:text-2xl font-bold text-gray-700 bg-white p-2 mb-3 md:ml-1"
              onClick={nextSlide}
            >
              &gt;
            </button>
          </>
        )}
        {window.innerWidth < 640 && ( // Hide arrows on smaller screens
          <h1 className="text-[20px] md:text-[25px] font-indif mb-2 cursor-pointer font-semibold">
            New Arrival
          </h1>
        )}
      </div>

      {/* View All Link */}
      <div className="text-center mb-6 md:mb-10">
        <Link
          to="/collection"
          className="text-black border-2 border-black p-2 hover:bg-black hover:text-white text-md md:text-lg hover:underline font-gara font-semibold"
        >
          View All
        </Link>
      </div>

      {/* Carousel Section (Images) */}
      <div
        className="relative w-full overflow-hidden px-4"
        onTouchStart={handleTouchStart} // Touch start handler
        onTouchMove={handleTouchMove} // Touch move handler
      >
        <div
          className="flex transition-transform ease-out duration-500 gap-4 object-fit"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }} // Adjust based on the number of items displayed
        >
          {combinedItems.map((item, index) => (
            <div
              key={item._id}
              className="w-[100%] sm:w-[48%] md:w-[30%] flex-shrink-0 relative" // Adjust width for different screen sizes
              onMouseEnter={() => setHoveredItemIndex(index)}
              onMouseLeave={() => setHoveredItemIndex(null)}
            >
              {/* Display the first or second image on hover */}
              <Link to={`/product/${item._id}`}>
                <img
                  src={
                    hoveredItemIndex === index && item.images[1]
                      ? item.images[1]
                      : item.images[0]
                  } // Swap to second image on hover
                  alt={item.name}
                  className="w-full h-[400px] sm:h-[400px] md:h-[500px] object-cover rounded-sm" // Responsive height for images
                />
              </Link>

              {/* Quick Buy Button on Hover */}
              {hoveredItemIndex === index && (
                <div className="absolute inset-0 top-[77%] md:top-[80%] left-0 right-0 text-center">
                  <Link to={`/product/${item._id}`}>
                    <button className="bg-white text-gray-500 rounded-md w-full py-2 px-4">
                      Quick Buy
                    </button>
                  </Link>
                </div>
              )}

              <div className="ml-2 md:ml-4 mb-2 py-2 md:py-4">
                <h2 className="text-sm sm:text-md md:text-lg text-center font-indif font-bold">
                  {item.name}
                </h2>{" "}
                {/* Responsive text size */}
                <p className="text-gray-500 font-gara font-semibold text-center">
                  Rs. {item.price}
                </p>{" "}
                {/* Responsive price text */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrival;
