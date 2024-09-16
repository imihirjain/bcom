import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const UserOrder = () => {
  const { id } = useParams(); // Order ID passed via URL
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const response = await fetch(`https://bcom-backend.onrender.com/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-5 mt-24 font-semibold">
      <h1 className="text-3xl font-bold mb-4">Order Details</h1>
      <div className="border p-4">
        <h2 className="text-xl">Order ID: {order._id}</h2>
        <p>Total Price: ₹{order.totalPrice}</p>
        <p>Status: {order.status}</p>
        <div>
          <h3 className="font-semibold">Items:</h3>
          {order.cartItems.map((item, idx) => (
            <div key={idx}>
              <p>Product: {item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <p>Size: {item.size}</p>
              <p>Collection: {item.collection || 'N/A'}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOrder;
