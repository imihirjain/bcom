import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UserOrder = () => {
  const { id } = useParams(); // Order ID passed via URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(
        `https://bcom-backend.onrender.com/api/orders/${id}`
      );
      const data = await response.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div className="text-center py-10 text-xl">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 mt-24 font-semibold">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Order Details</h1>

      <div className="bg-white shadow-md rounded-lg p-6 border border-gray-300">
        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Order ID: {order._id}</h2>
          <p className="text-lg">
            Total Price:{" "}
            <span className="font-semibold">₹{order.totalPrice}</span>
          </p>
          <p className="text-lg">
            Status:{" "}
            <span
              className={`font-semibold ${
                order.status === "Delivered" ? "text-green-600" : "text-red-600"
              }`}
            >
              {order.status}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-3 text-gray-600">Items:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {order.cartItems.map((item, idx) => (
              <div key={idx} className="flex bg-gray-50 p-4 rounded-lg shadow">
                {/* Product Image */}
                <div className="w-1/3">
                  <img
                    src={item.image} // Assuming the image URL is available in item.image
                    alt={item.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>

                {/* Product Details */}
                <div className="ml-4 w-2/3">
                  <h4 className="text-lg font-bold mb-1">{item.name}</h4>
                  <p className="text-sm mb-1">Quantity: {item.quantity}</p>
                  <p className="text-sm mb-1">Price: ₹{item.price}</p>
                  <p className="text-sm mb-1">Size: {item.size}</p>
                  <p className="text-sm mb-1">
                    Collection: {item.collection || "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reorder / Track Buttons */}
        <div className="mt-6 flex justify-end space-x-4">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600">
            Track Order
          </button>
          <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600">
            Reorder
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
