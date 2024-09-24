import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import { ToastContainer, toast } from "react-toastify";

const ProductInfo = () => {
  const { id, collectionId } = useParams(); // Get product ID and collection ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Index for current main image
  const [isCollectionProduct, setIsCollectionProduct] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null); // Track selected size
  const [categoryName, setCategoryName] = useState(""); // To store the fetched category name
  const [collectionName, setCollectionName] = useState(""); // To store the fetched collection name
  const [moreProducts, setMoreProducts] = useState([]); // State to store more products

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await fetch(
          `https://bcom-backend.onrender.com/api/products/${id}/products/${id}`
        );
        if (productResponse.ok) {
          const productData = await productResponse.json();
          setProduct(productData);
          setCurrentImageIndex(0);
          setIsCollectionProduct(false);
          if (productData.category) {
            fetchCategoryName(productData.category);
            fetchMoreProductsByCategory(productData.category); // Fetch more products from the same category
          }
        } else {
          const collectionProductResponse = await fetch(
            `https://bcom-backend.onrender.com/api/collection-products/${collectionId}/products/${id}`
          );
          if (collectionProductResponse.ok) {
            const collectionProductData =
              await collectionProductResponse.json();
            setProduct(collectionProductData);
            setCurrentImageIndex(0);
            setIsCollectionProduct(true);
            if (collectionProductData.collection) {
              fetchCollectionName(collectionProductData.collection);
              fetchMoreProductsByCollection(collectionProductData.collection); // Fetch more products from the same collection
            }
          } else {
            throw new Error("Product not found");
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchCategoryName = async (categoryId) => {
      try {
        const categoryResponse = await fetch(
          `https://bcom-backend.onrender.com/api/categories/${categoryId}`
        );
        if (categoryResponse.ok) {
          const categoryData = await categoryResponse.json();
          setCategoryName(categoryData.name);
        } else {
          console.error("Failed to fetch category details");
        }
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };

    const fetchCollectionName = async (collectionId) => {
      try {
        const collectionResponse = await fetch(
          `https://bcom-backend.onrender.com/api/collections/${collectionId}`
        );
        if (collectionResponse.ok) {
          const collectionData = await collectionResponse.json();
          setCollectionName(collectionData.name);
        } else {
          console.error("Failed to fetch collection details");
        }
      } catch (error) {
        console.error("Error fetching collection details:", error);
      }
    };

    // Fetch more products from the same category
    const fetchMoreProductsByCategory = async (categoryId) => {
      try {
        const response = await fetch(
          `https://bcom-backend.onrender.com/api/categories/${categoryId}/products`
        );
        if (response.ok) {
          const data = await response.json();
          setMoreProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching more category products:", error);
      }
    };

    // Fetch more products from the same collection
    const fetchMoreProductsByCollection = async (collectionId) => {
      try {
        const response = await fetch(
          `https://bcom-backend.onrender.com/api/collections/${collectionId}/products`
        );
        if (response.ok) {
          const data = await response.json();
          setMoreProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching more collection products:", error);
      }
    };

    fetchProduct();
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
      // alert("Please select a size before adding to cart!");
      toast.error("Select the size");
      return;
    } else toast.success("Item added to Cart");

    const cartItem = {
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      size: selectedSize,
      description: product.description,
      category: categoryName,
      collection: isCollectionProduct ? collectionName : null,
      image: product.images[currentImageIndex],
    };

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productIndex = existingCart.findIndex(
      (item) => item.id === cartItem.id && item.size === selectedSize
    );

    if (productIndex >= 0) {
      existingCart[productIndex].quantity += quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));
    
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleNextImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
  };

  if (!product) return <p>Loading product...</p>;

  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container mx-auto p-5 mt-24 overflow-x-hidden font-indif">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="w-full md:w-1/2 relative md:ml-[100px]">
            <img
              src={
                product.images[currentImageIndex] ||
                "https://via.placeholder.com/400"
              }
              alt={product.name}
              className="w-full h-auto"
            />
            <button
              onClick={handleNextImage}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent text-white p-2 rounded-sm hover:bg-gray-700 transition"
            >
              &#10095;
            </button>
            <div className="flex gap-4 mt-4">
              {product.images &&
                product.images.length > 0 &&
                product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product Thumbnail ${index + 1}`}
                    className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                      currentImageIndex === index
                        ? "border-blue-500"
                        : "border-transparent"
                    }`}
                    onClick={() => handleThumbnailClick(index)}
                  />
                ))}
            </div>
          </div>

          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-indif mb-4">{product.name}</h1>
            <p className="text-xl font-serif text-gray-400 mb-4">
              Price: ₹{product.price}
            </p>
            <div className="h-[1px] md:w-3/4 bg-slate-400"></div>

            <div>
              <h2 className="font-gara text-2xl text-gray-400 mb-2 mt-2">
                Size
              </h2>
              {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                <button
                  key={size}
                  className={`px-4 py-2 border-[1px] font-gara rounded-md border-black ml-4 ${
                    selectedSize === size
                      ? "bg-black text-white"
                      : "bg-white text-black"
                  }`}
                  onClick={() => handleSizeSelection(size)}
                >
                  {size}
                </button>
              ))}
              <div className="mt-4">
                <Link
                  to="/size"
                  className="font-gara text-xl hover:underline text-blue-700"
                >
                  Size Chart
                </Link>
              </div>
            </div>

            <p className="text-gray-700 mb-4 mt-2 text-xl font-gara">
              {isCollectionProduct
                ? `Collection: ${collectionName}`
                : `Category: ${categoryName}`}
            </p>
            <p className="text-gray-600 mb-6 font-gara">
              {product.description}
            </p>

            <div className="flex items-center mb-6">
              <button
                onClick={handleDecrement}
                className="px-4 py-2 bg-gray-200 border-[1px] rounded-sm border-black"
              >
                -
              </button>
              <span className="px-4 py-2 border-1 rounded-sm ml-4 border-black font-gara">
                {quantity}
              </span>
              <button
                onClick={handleIncrement}
                className="px-4 py-2 ml-4 bg-gray-200 border-[1px] rounded-sm border-black"
              >
                +
              </button>
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-white text-[#4c4c4b] border-[1px] w-3/4 border-black py-3 px-6 rounded-lg hover:bg-[#4c4c4b] hover:text-white transition duration-300 mt-4 font-gara"
            >
              Add to Cart
            </button>
          </div>
        </div>

        {/* Display more products */}
        <div className="mt-16">
          <h2 className="text-2xl font-serif mb-6">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {moreProducts.map((relatedProduct) => (
              <div key={relatedProduct._id} className="border p-4 rounded-lg">
                <img
                  src={
                    relatedProduct.images[0] ||
                    "https://via.placeholder.com/200"
                  }
                  alt={relatedProduct.name}
                  className="w-full h-48 object-cover mb-4"
                />
                <h3 className="text-lg font-serif">{relatedProduct.name}</h3>
                <p className="text-gray-500">₹{relatedProduct.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductInfo;
