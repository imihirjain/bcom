import React, { useEffect, useState } from "react";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [sortOrder, setSortOrder] = useState("newToOld"); // Default sort order
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(
        "https://bcom-backend.onrender.com/api/orders"
      );
      const data = await response.json();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // Handle sorting
  const sortedOrders = [...orders].sort((a, b) => {
    if (sortOrder === "newToOld") {
      return new Date(b.createdAt) - new Date(a.createdAt);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }
  });

  // Filter orders by date range
  const filteredOrders = sortedOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && end) {
      return orderDate >= start && orderDate <= end;
    } else if (start) {
      return orderDate >= start;
    } else if (end) {
      return orderDate <= end;
    }
    return true;
  });

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sorting and Filtering Controls */}
      <div className="p-5 mt-24 font-semibold ml-0 md:ml-64 w-full">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-gray-700">
          All Orders
        </h1>

        {/* Sort Dropdown */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <label className="font-medium">Sort By:</label>
            <select
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="newToOld">New to Old</option>
              <option value="oldToNew">Old to New</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center space-x-3 mt-3 md:mt-0">
            <label className="font-medium">Start Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label className="font-medium">End Date:</label>
            <input
              type="date"
              className="border border-gray-300 rounded-lg px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        {/* Orders Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-lg p-4 md:p-6 border border-gray-300"
            >
              <div className="mb-4">
                <h2 className="text-xl md:text-2xl font-bold mb-2">
                  Order ID: {order._id}
                </h2>
                <p className="text-base md:text-lg">
                  Total Price:{" "}
                  <span className="font-semibold">₹{order.totalPrice}</span>
                </p>
                <p className="text-base md:text-lg">
                  Status:{" "}
                  <span
                    className={`font-semibold ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Order Date: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4">
                <h3 className="text-lg md:text-xl font-semibold mb-3 text-gray-600">
                  Items:
                </h3>
                {order.cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col md:flex-row bg-gray-50 p-4 rounded-lg shadow mb-3"
                  >
                    {/* Product Image */}
                    <div className="w-full md:w-1/3">
                      <img
                        src={item.image} // Assuming the image URL is available in item.image
                        alt={item.name}
                        className="w-full h-auto rounded-lg"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="ml-0 md:ml-4 mt-4 md:mt-0 w-full md:w-2/3">
                      <h4 className="text-base md:text-lg font-bold mb-1">
                        {item.name}
                      </h4>
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

              <div className="mt-4 flex flex-col md:flex-row justify-end space-y-3 md:space-y-0 md:space-x-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600 w-full md:w-auto">
                  Track Order
                </button>
                <button className="bg-yellow-500 text-white px-4 py-2 rounded-lg shadow hover:bg-yellow-600 w-full md:w-auto">
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
