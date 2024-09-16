import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quickBuyProductId, setQuickBuyProductId] = useState(null); // State to track the quick buy

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const [productsResponse, collectionProductsResponse] = await Promise.all([
          fetch("https://bcom-backend.onrender.com/api/products/products"),
          fetch("https://bcom-backend.onrender.com/api/collection-products/products")
        ]);

        const productsData = await productsResponse.json();
        const collectionProductsData = await collectionProductsResponse.json();
        
        const combinedProducts = [...productsData, ...collectionProductsData];

        setProducts(combinedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleQuickBuyClick = (productId) => {
    setQuickBuyProductId(productId === quickBuyProductId ? null : productId); // Toggle quick buy
  };

  if (loading) return <p>Loading products...</p>;

  return (
    <div className="container mx-auto p-5 mt-20">
      <h1 className="text-3xl font-serif uppercase mb-8 text-center">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {products.map((product) => (
          <div key={product._id} className="group relative">
            <div className="relative h-[80vh] w-full overflow-hidden object-cover">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="object-cover h-full w-full cursor-pointer"
                />
              </Link>
              <div className="absolute top-2 right-2 bg-white text-red-500 text-xs px-2 py-1">
                Ready To Ship
              </div>
              <div className="absolute bottom-1 left-1 right-1 bg-opacity-70 bg-black opacity-0 group-hover:opacity-100 transition-opacity">
                <button 
                  className="w-full rounded-sm text-black bg-white py-2 px-4"
                  onClick={() => handleQuickBuyClick(product._id)}
                >
                  Quick Buy
                </button>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{product.name}</h2>
            {product.category?.name ? (
              <p className="text-sm text-gray-600 mb-1">Category: {product.category.name}</p>
            ) : product.collection?.name ? (
              <p className="text-sm text-gray-600 mb-1">Collection: {product.collection.name}</p>
            ) : (
              <p className="text-sm text-gray-600 mb-1">No Category or Collection</p>
            )}
            <p className="text-gray-500">₹{product.price}</p>

            {/* Conditionally render the Quick Buy details */}
            {quickBuyProductId === product._id && (
              <div className="mt-4 bg-gray-100 p-4 w-full rounded-lg shadow-lg">
                 <img
                  src={product.images && product.images.length > 0 ? product.images[0] : 'https://via.placeholder.com/400'}
                  alt={product.name}
                  className="object-cover h-full w-full cursor-pointer"
                />
                <h3 className="text-lg font-semibold">Buy Now</h3>
                <p>Size: XS, S, M, L, XL, XXL</p>
                <div className="flex items-center mt-2">
                  <span>Quantity:</span>
                  <button className="px-2 py-1 mx-2 bg-gray-300 rounded">-</button>
                  <span>1</span>
                  <button className="px-2 py-1 mx-2 bg-gray-300 rounded">+</button>
                </div>
                <Link to={`/product/${product._id}`}>
                <button className="w-full mt-2 bg-black text-white py-2 rounded">Add to Cart</button>
                </Link>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
