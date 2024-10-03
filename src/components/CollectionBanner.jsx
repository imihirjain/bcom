import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

// Import images from src/assets
import redNetLehenga from "../assets/2.png";
import deepWineLehenga from "../assets/LOOK_22_3364_720x.webp";
import greenOrganzaLehenga from "../assets/LOOK_22_3364_720x.webp";
import goldTissueLehenga from "../assets/LOOK_22_3364_720x.webp";

// Array of images
const images = [
  redNetLehenga,
  deepWineLehenga,
  greenOrganzaLehenga,
  goldTissueLehenga,
];

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleImages = 3;

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get(
          "https://bcom-backend.onrender.com/api/collections"
        );
        setCollections(response.data);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
    fetchCollections();
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? collections.length - visibleImages : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === collections.length - visibleImages ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      {/* Carousel Section (Images) */}
      <div className="relative w-full overflow-hidden">
        <div
          className={`flex transition-transform ease-out duration-500 gap-4 ${
            collections.length === 1 ? "justify-center" : ""
          }`}
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleImages)}%)`,
          }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`${
                collections.length === 1 ? "w-full" : "w-full sm:w-1/2 lg:w-1/3"
              } flex-shrink-0`} // Full width if only one collection, adjust for different screen sizes
            >
              <Link to={`/collection/${collection._id}`}>
                <img
                  src={images[index % images.length]} // Assign image from the images array
                  alt={collection.name}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[600px] object-cover cursor-pointer"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center p-6">
                  <h2 className="text-white lg:text-3xl text-2xl font-semibold font-indif cursor-pointer uppercase text-center mt-44 lg:mt-96 hover:underline ">
                    {collection.name}
                  </h2>
                  <p className="text-gray-500 font-gara font-semibold">
                    {collection.price}
                  </p>{" "}
                  {/* Add price if available in API */}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
