import React, { useState, useEffect } from 'react';
// Import images from src/assets
import slide1 from '../assets/2.png';
import slide2 from '../assets/3.png';
import slide3 from '../assets/4.png';

const Slider = () => {
  const slides = [slide1, slide2, slide3];
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Function to go to the previous slide
  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 700); // Time duration for the effect
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 700); // Time duration for the effect
  };

  // Automatic sliding effect every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 4000); // Slide changes every 4 seconds

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[80vh] relative overflow-hidden">
      {/* Slider Container */}
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {/* Slider Items */}
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            <img
              src={slide}
              alt={`Slide ${index}`}
              className={`w-full h-full object-contain transition-all duration-700 ${
                isTransitioning ? 'scale-110 blur-sm' : 'scale-100 blur-0'
              }`}
            />
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-white opacity-75 hover:opacity-100 bg-gray-700 rounded-full"
      >
        &#10094;
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-white opacity-75 hover:opacity-100 bg-gray-700 rounded-full"
      >
        &#10095;
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 bg-white rounded-full transition-all ${
              currentIndex === index ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
