import React, { useEffect, useState } from "react";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/orders");
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      }
    };

    fetchOrders();
  }, []);

  if (orders.length === 0) return <p>No orders available.</p>;

  return (
    <div className="container mx-auto p-5 mt-24">
      <h1 className="text-3xl font-bold mb-4">All Orders</h1>
      <div className="grid gap-5">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border-b">
            <h2 className="font-bold mb-2">Order ID: {order._id}</h2>
            <p>Total Price: ₹{order.totalPrice}</p>
            <p>Payment Status: {order.paymentStatus || "Pending"}</p>
            <h3 className="font-semibold">Items:</h3>
            <ul>
              {order.cart.map((item) => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
