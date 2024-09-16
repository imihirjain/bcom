import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ProductInfo = () => {
  const { id, collectionId } = useParams(); // Get product ID and collection ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index for current main image
  const [isCollectionProduct, setIsCollectionProduct] = useState(false);
  const [collectionProducts, setCollectionProducts] = useState([]); // To store collection products
  const [selectedSize, setSelectedSize] = useState(null); // Track selected size

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // First, try fetching the product from the category API
        const productResponse = await fetch(`http://localhost:5000/api/products/${id}/products/${id}`);
        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProduct(productData);
          setCurrentImageIndex(0); // Set first image as main image
          setIsCollectionProduct(false); // It's a regular category product
        } else {
          // If the regular product is not found, fetch from the collection product API
          const collectionProductResponse = await fetch(`http://localhost:5000/api/collection-products/${collectionId}/products/${id}`);
          if (collectionProductResponse.ok) {
            const collectionProductData = await collectionProductResponse.json();
            setProduct(collectionProductData);
            setCurrentImageIndex(0); // Set first image as main image
            setIsCollectionProduct(true); // It's a collection product
          } else {
            throw new Error("Product not found");
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    // Fetch related collection products from API
    const fetchCollectionProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/collection-products/66e68e0c8fa576c8d8b56d28/products');
        if (response.ok) {
          const productsData = await response.json();
          setCollectionProducts(productsData); // Set collection products
        } else {
          console.error('Error fetching collection products');
        }
      } catch (error) {
        console.error('Error fetching collection products:', error);
      }
    };

    fetchProduct();
    fetchCollectionProducts(); // Fetch the collection products
  }, [id, collectionId]);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize, // Include the selected size
      description: product.description,
      category: product.category?.name,
      collection: isCollectionProduct ? product.collection?.name : null,
      image: product.images[currentImageIndex],
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product already exists in the cart
    const productIndex = existingCart.findIndex(item => item.id === cartItem.id && item.size === selectedSize);

    if (productIndex >= 0) {
      // If product exists, update the quantity
      existingCart[productIndex].quantity += quantity;
    } else {
      // If product doesn't exist, add it to the cart
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    console.log(`${quantity} of ${product.name} (Size: ${selectedSize}) added to cart`);
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size); // Update the selected size
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <div className="container mx-auto p-5 mt-24 overflow-x-hidden">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 relative md:ml-[100px]">
          {/* Main Image */}
          <img
            src={product.images[currentImageIndex] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-auto "
          />

          <button
            onClick={handleNextImage}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-sm hover:bg-gray-700 transition"
          >
            &#10095; {/* Right arrow */}
          </button>

          {/* Thumbnails */}
          <div className="flex gap-4 mt-4">
            {product.images && product.images.length > 0 && product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Product Thumbnail ${index + 1}`}
                className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${currentImageIndex === index ? 'border-blue-500' : 'border-transparent'}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-serif mb-4">{product.name}</h1>
          <p className="text-xl font-serif text-gray-400 mb-4">Price: ₹{product.price}</p>
          <div className='h-[1px] md:w-3/4 bg-slate-400'></div>

          <div>
            <h2 className='font-serif text-lg text-gray-400 mb-2'>Size</h2>
            {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <button
                key={size}
                className={`px-4 py-2 border-[1px] rounded-md border-black ml-4 ${selectedSize === size ? 'bg-black text-white' : 'bg-white text-black'}`}
                onClick={() => handleSizeSelection(size)}
              >
                {size}
              </button>
            ))}
          </div>

          <p className="text-gray-700 mb-4 mt-2">Category: {product.category?.name || 'N/A'}</p>
          <p className="text-gray-700 mb-4">
            Collection: {isCollectionProduct ? product.collection?.name : 'N/A'}
          </p>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <button onClick={handleDecrement} className="px-4 py-2 bg-gray-200 border-[1px] rounded-sm border-black">
              -
            </button>
            <span className="px-4 py-2 border-1 rounded-sm ml-4 border-black">{quantity}</span>
            <button onClick={handleIncrement} className="px-4 py-2 ml-4 bg-gray-200 border-[1px] rounded-sm border-black">
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="bg-white text-[#4c4c4b] border-[1px] w-3/4 border-black py-3 px-6 rounded-lg hover:bg-[#4c4c4b] hover:text-white transition duration-300 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
