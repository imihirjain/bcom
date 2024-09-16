import React, { useState } from 'react';

const products = [
  {
    id: 1,
    name: 'Black Georgette Lehenga Set',
    price: 'Rs. 58,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 2,
    name: 'Peach Net Lehenga Set',
    price: 'Rs. 120,000.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 3,
    name: 'Red Net Lehenga Set',
    price: 'Rs. 142,000.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  {
    id: 4,
    name: 'Deep Wine Net Lehenga Set',
    price: 'Rs. 140,500.00',
    image: 'https://angadsinghofficial.com/cdn/shop/files/LOOK_14_8285_360x.jpg?v=1724063071', // Replace with actual image URL
  },
  // Add more products if necessary
];

const ProductCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? products.length - 1 : prev - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev === products.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="relative w-full mt-10">
      {/* Carousel Wrapper */}
      <div className="flex overflow-hidden">
        {products.map((product, index) => (
          <div
            key={product.id}
            className={`w-[300px] h-[500px] flex-shrink-0 transition-transform duration-500 transform ${
              index === currentIndex ? 'translate-x-0' : ''
            }`}
          >
            {/* Product Card */}
            <div className="mx-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
              <h2 className="mt-4 text-lg font-semibold">{product.name}</h2>
              <p className="mt-2 text-gray-700">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default ProductCarousel;
