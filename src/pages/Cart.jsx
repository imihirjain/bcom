import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Added Link import

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(cartData);
    calculateTotalPrice(cartData);
  }, []);

  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateTotalPrice = (cartData) => {
    const total = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1); // Remove the item from the array
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart)); // Update localStorage
  };

  const handleCheckout = async () => {
    const currentCart = cart.map((item) => ({
      productId: item.id,  // Assuming `id` is the productId in the cart state
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      collection: item.collection,
    }));
  
    try {
      const response = await fetch("https://bcom-backend.onrender.com/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalPrice, currency: "INR", cartItems: currentCart }),
      });
  
      const order = await response.json();
  
      if (order && order.id) {
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };
  
            const verifyResponse = await fetch(
              "https://bcom-backend.onrender.com/api/payments/verify",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(paymentData),
              }
            );
  
            if (verifyResponse.ok) {
              const orderResponse = await fetch("https://bcom-backend.onrender.com/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  cartItems: currentCart,
                  totalPrice: totalPrice,
                  paymentData: paymentData,
                }),
              });
  
              setCart([]);
              localStorage.removeItem("cart");
              navigate("/admin/all-orders"); // Directly redirect to orders page
            } else {
              alert("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
        };
  
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Order creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };
  
  // If the cart is empty, show an icon and a "Shop Now" link
  if (cart.length === 0) {
    return (
      <div className="container mx-auto text-center mt-24">
        <img
          src="data:image/png;base64,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" // Replace with actual icon URL
          alt="Empty Cart"
          className="mx-auto mb-4 w-32 h-32"
        />
        <p className="text-xl font-semibold">Your cart is empty</p>
        <Link
          to="/"
          className="text-blue-500 underline hover:text-blue-700"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-5 mt-24 font-corm font-semibold">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      <div className="grid gap-5">
        {cart.map((item, index) => (
          <div key={item.id} className="flex justify-between items-center p-4 border-b">
            <div className="flex gap-4">
              <img src={item.image} alt={item.name} className="w-20 h-20" />
              <div>
                <h2 className="font-bold text-xl">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <p>Size: {item.size}</p> 
                <p>Category: {item.category || "N/A"}</p> 
                <p>Collection: {item.collection || "N/A"}</p> 
                <p>Description: {item.description}</p> 
                <div className="flex items-center mt-2">
                  <button
                    className="px-4 py-2 bg-gray-200 border-[1px] rounded-sm border-black"
                    onClick={() => handleDecrement(index)}
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity}</span>
                  <button
                    className="px-4 py-2 bg-gray-200 border-[1px] rounded-sm border-black"
                    onClick={() => handleIncrement(index)}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(index)}
                  className="bg-white text-red-500 border-[1px] border-red-400 w-3/4  py-3 px-6 rounded-lg hover:bg-red-400 hover:border-white hover:text-white transition duration-300 mt-4"
                >
                  Remove
                </button>
              </div>
            </div>
            <div>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-semibold">Total Price: ₹{totalPrice}</h2>
        <button
          onClick={handleCheckout}
          className="bg-white text-[#4c4c4b] border-[1px] lg:w-[300px] border-black py-3 px-6 rounded-lg hover:bg-[#4c4c4b] hover:text-white transition duration-300 mt-4"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
