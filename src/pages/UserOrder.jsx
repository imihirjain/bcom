import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const UserOrder = () => {
  const { id } = useParams(); // Extract the dynamic order ID from the URL
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `https://bcom-backend.onrender.com/api/user/${id}` // Dynamic ID in the API call
        );
        const data = await response.json();
        setOrder(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
        setLoading(false);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]); // Dependency array includes id to re-fetch when it changes

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  if (!order) {
    return <div className="text-center py-10 text-xl">Order not found!</div>;
  }

  return (
    <div className="container mx-auto p-5 mt-24">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Your Orders</h1>

      {/* Order Summary */}
      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            Order ID: {order._id}
          </h2>
          <p className="text-lg text-gray-600">
            Total Price:{" "}
            <span className="font-semibold">₹{order.totalPrice}</span>
          </p>
          <p className="text-lg text-gray-600">
            Status:{" "}
            <span
              className={`font-semibold ${
                order.status === "Completed"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>

        {/* Order Items */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-600">
            Ordered Items:
          </h3>
          <div className="space-y-4">
            {order.cartItems.map((item, idx) => (
              <div
                key={idx}
                className="flex bg-gray-50 p-4 rounded-lg shadow-md space-x-4"
              >
                {/* Product Image */}
                <div className="w-20 h-20">
                  <img
                    src={item.image} // Assuming the image URL is available in item.image
                    alt={item.name}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    Quantity: {item.quantity}
                  </p>
                  <p className="text-sm text-gray-600">Price: ₹{item.price}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">
                    Collection: {item.collection || "N/A"}
                  </p>
                </div>

                {/* Total Price for the item */}
                <div className="text-right text-lg font-semibold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reorder / Track Buttons */}
        <div className="mt-6 flex justify-between">
          <Link to="/track-order" className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Track Order
          </Link>
          <Link to="/" className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600">
            Reorder
          </Link>
        </div>
      </div>

      {/* User Details */}
      <div className="mt-8 bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <h3 className="text-lg font-semibold mb-4 text-gray-600">
          Shipping Details:
        </h3>
        <p className="text-md text-gray-600">
          Name: {order.userDetails.name}
        </p>
        <p className="text-md text-gray-600">
          Phone: {order.userDetails.phone}
        </p>
        <p className="text-md text-gray-600">
          Email: {order.userDetails.email}
        </p>
        <p className="text-md text-gray-600">
          Address: {order.userDetails.address}
        </p>
      </div>
    </div>
  );
};

export default UserOrder;
