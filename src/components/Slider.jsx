import React, { useState, useEffect } from "react";
import axios from "axios";

const Slider = () => {
  const [slides, setSlides] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get(
          "https://bcom-backend.onrender.com/api/media/all"
        );
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching media:", error);
      }
    };

    fetchSlides();
  }, []);

  const prevSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const isFirstSlide = currentIndex === 0;
      const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 700);
  };

  const nextSlide = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 700);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 4000);

    return () => clearTimeout(timer);
  }, [currentIndex]);

  return (
    <div className="w-full max-h-[400px] sm:max-h-[500px] md:max-h-[600px] lg:max-h-[80vh] relative overflow-hidden">
      <div
        className="w-full h-full flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full h-full flex-shrink-0">
            {slide.type === "image" ? (
              <img
                src={slide.url}
                alt={`Slide ${index}`}
                className={`w-full h-full object-contain transition-all duration-700 ${
                  isTransitioning ? "scale-110 blur-sm" : "scale-100 blur-0"
                }`}
              />
            ) : (
              <video
                src={slide.url}
                autoPlay
                muted
                loop
                controls
                className={`w-full h-full object-contain transition-all duration-700 ${
                  isTransitioning ? "scale-110 blur-sm" : "scale-100 blur-0"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 p-2 text-white opacity-75 hover:opacity-100 bg-gray-700 rounded-full"
      >
        &#10094;
      </button>

      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 p-2 text-white opacity-75 hover:opacity-100 bg-gray-700 rounded-full"
      >
        &#10095;
      </button>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`cursor-pointer w-3 h-3 bg-white rounded-full transition-all ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
