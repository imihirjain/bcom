import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You can use fetch as well, but axios is often easier

// Import images from src/assets
import redNetLehenga from '../assets/2.png'; 
import deepWineLehenga from '../assets/LOOK_22_3364_720x.webp';
import greenOrganzaLehenga from '../assets/LOOK_22_3364_720x.webp';
import goldTissueLehenga from '../assets/LOOK_22_3364_720x.webp';
import { Link } from 'react-router-dom';

// Array of images (add corresponding images here)
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

  // Fetch the collections data from the API
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('https://bcom-backend.onrender.com/api/collections');
        setCollections(response.data);  // Assuming the API returns an array of collections
      } catch (error) {
        console.error('Error fetching collections:', error);
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
    <div className="w-full flex flex-col items-center justify-center py-10 mt-12">
      {/* Text Section */}
      <div className="text-center mb-6">
        <h2 className=" mb-2 text-[25px] font-corm font-semibold">Explore</h2>
        <p className="text-[20px] font-gara font-semibold mt-5 text-gray-600">
          Our curated collection of lehengas, shararas, kurtas and more.
        </p>
      </div>

      {/* Introduction Section with Arrows */}
      <div className="flex items-center justify-center w-full max-w-6xl mb-2">
        <button
          className="text-2xl mb-2 font-bold text-gray-700 bg-white p-2 mr-4"
          onClick={prevSlide}
        >
          &lt;
        </button>
        <h1 className="text-[25px] font-corm font-semibold">Collection</h1>
        <button
          className="text-2xl mb-2 font-bold text-gray-700 bg-white p-2 ml-4"
          onClick={nextSlide}
        >
          &gt;
        </button>
      </div>

      {/* Carousel Section (Images) */}
      <div className="relative w-full overflow-hidden mt-5 ">
        <div
          className={`flex transition-transform ease-out duration-500 gap-4 object-fit ${collections.length === 1 ? 'justify-center' : ''}`}
          style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}
        >
          {collections.map((collection, index) => (
            <div
              key={collection.id}
              className={`${collections.length === 1 ? 'w-full' : 'w-[30%]'} flex-shrink-0`} // Full width if only one collection
            >
              <Link to={`/collection/${collection._id}`} >
              <img
                src={images[index % images.length]}  // Assign image from the images array
                alt={collection.name}
                className="w-full h-[600px] object-fit cursor-pointer"
              />
              <div className="">
                <h2 className="text-3xl font-bold text-center font-corm mt-2 cursor-pointer">{collection.name}</h2>
                <p className="text-gray-500 font-gara font-semibold">{collection.price}</p> {/* Add price if available in API */}
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
