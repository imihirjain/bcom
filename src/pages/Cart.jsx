import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [userDetails, setUserDetails] = useState({
    name: "",
    phone: "",
    email: "",
    pincode: "",
    address: "",
  });
  const navigate = useNavigate();

  // Fetch cart and user details from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart")) || [];
    const storedUserDetails = JSON.parse(
      localStorage.getItem("userDetails")
    ) || {
      name: "",
      phone: "",
      email: "",
      pincode: "",
      address: "",
    };

    setCart(cartData);
    setUserDetails(storedUserDetails);
    calculateTotalPrice(cartData);
  }, []);

  // Increment quantity
  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success("Item quantity increased!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: true,
    });
  };

  // Decrement quantity
  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // Calculate total price of cart items
  const calculateTotalPrice = (cartData) => {
    const total = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Remove item from cart
  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle input changes for user details
  const handleUserDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ ...userDetails, [name]: value })
    );
  };

  // Checkout handler function
  const handleCheckout = async () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId"); // Ensure userId is fetched here

    if (!token) {
      // Redirect to login page with redirect query to cart
      return navigate("/login?redirect=/cart");
    }

    if (
      !userDetails.name ||
      !userDetails.phone ||
      !userDetails.email ||
      !userDetails.address
    ) {
      return toast.error("Please fill out all user details.");
    }

    const currentCart = cart.map((item) => ({
      productId: item.id,
      name: item.name,
      description: item.description,
      image: item.image,
      price: item.price,
      quantity: item.quantity,
      size: item.size,
      collection: item.collection,
    }));

    try {
      // Create order for payment on the backend
      const paymentResponse = await fetch(
        "https://bcom-backend.onrender.com/api/payments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            amount: totalPrice,
            currency: "INR",
            cartItems: currentCart,
            userDetails,
          }),
        }
      );

      const order = await paymentResponse.json();

      if (order && order.id) {
        // Set up Razorpay options for payment
        const options = {
          key: order.razorpayKey,
          amount: order.amount,
          currency: order.currency,
          order_id: order.id,
          handler: async function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            try {
              const verifyResponse = await fetch(
                "https://bcom-backend.onrender.com/api/payments/verify",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                  },
                  body: JSON.stringify(paymentData),
                }
              );

              const verifyResult = await verifyResponse.json();

              if (verifyResponse.ok) {
                const orderResponse = await fetch(
                  "https://bcom-backend.onrender.com/api/orders",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      cartItems: currentCart,
                      totalPrice,
                      paymentData,
                      userDetails,
                      userId, // Ensure userId is passed here
                    }),
                  }
                );

                const orderResult = await orderResponse.json();
                console.log(orderResult);

                if (orderResponse.ok) {
                  // Clear cart and redirect to orders page
                  setCart([]);
                  localStorage.removeItem("cart");
                  navigate(`/user`);
                  // navigate(`/`);
                } else {
                  toast.error("Order creation failed. Please try again.");
                }
              } else {
                toast.error("Payment verification failed. Please try again.");
              }
            } catch (error) {
              console.error("Error during payment verification:", error);
              toast.error(
                "Something went wrong during payment verification. Please try again."
              );
            }
          },
          prefill: {
            name: userDetails.name,
            email: userDetails.email,
            contact: userDetails.phone,
            pincode: userDetails.pincode,
            address: userDetails.address,
          },
          theme: {
            color: "#F37254",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error("Order creation failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Something went wrong during checkout. Please try again.");
    }
  };

  // Render empty cart message if no items
  if (cart.length === 0) {
    return (
      <div className="container mx-auto text-center mt-24 flex justify-center items-center flex-col">
        <img
          src="https://cdn-icons-png.flaticon.com/512/11329/11329060.png"
          alt="Empty Cart"
          className="mx-auto mb-4 w-64 h-64"
        />
        <p className="text-xl font-semibold">Your cart is empty</p>
        <Link to="/" className="text-blue-500 underline hover:text-blue-700">
          Shop Now
        </Link>
      </div>
    );
  }

  // Render cart with items and user details form
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="container mx-auto p-5 mt-24">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        <div className="grid gap-5">
          {cart.map((item, index) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 border-b"
            >
              <div className="flex gap-4">
                <img src={item.image} alt={item.name} className="w-20 h-20" />
                <div>
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <p>Price: ₹{item.price}</p>
                  <p>Size: {item.size}</p>
                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => handleDecrement(index)}
                      className="px-4 py-2 bg-gray-200"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => handleIncrement(index)}
                      className="px-4 py-2 bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(index)}
                    className="bg-red-500 text-white px-6 py-2 mt-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <p>Total: ₹{item.price * item.quantity}</p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold">Total Price: ₹{totalPrice}</h2>
          <h3 className="text-xl mt-4">Shipping Details</h3>
          <div className="grid gap-4 mt-4">
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={userDetails.name}
              onChange={handleUserDetailsChange}
              className="p-2 border"
            />
            <input
              type="text"
              name="phone"
              placeholder="Enter Phone Number"
              value={userDetails.phone}
              onChange={handleUserDetailsChange}
              className="p-2 border"
            />
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={userDetails.email}
              onChange={handleUserDetailsChange}
              className="p-2 border"
            />
            <input
              type="number"
              name="pincode"
              placeholder="Enter Pincode"
              value={userDetails.pincode}
              onChange={handleUserDetailsChange}
              className="p-2 border"
            />
            <textarea
              name="address"
              placeholder="Enter Address"
              value={userDetails.address}
              onChange={handleUserDetailsChange}
              className="p-2 border"
            />
          </div>
          <button
            onClick={handleCheckout}
            className="bg-blue-500 text-white px-6 py-2 mt-4"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
