import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // Initialize cart from localStorage if it exists
    const cartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartData);
    updateCartCount(cartData);
    calculateTotalPrice(cartData);
  }, []);

  // Update the cartCount based on the cart state
  const updateCartCount = (cartData) => {
    const totalItems = cartData.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(totalItems);
  };

  // Calculate the total price of the cart
  const calculateTotalPrice = (cartData) => {
    const total = cartData.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

  // Add item to cart and update localStorage
  const addToCart = (newItem) => {
    const updatedCart = [...cart, newItem];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  // Increment/Decrement functions
  const handleIncrement = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity += 1;
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handleDecrement = (index) => {
    const updatedCart = [...cart];
    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
      calculateTotalPrice(updatedCart);
      updateCartCount(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Remove item from cart
  const handleRemove = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
    updateCartCount(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        totalPrice,
        addToCart,
        handleIncrement,
        handleDecrement,
        handleRemove,
        setCart, // Make sure setCart is available in the context
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
