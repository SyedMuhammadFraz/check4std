import React, { createContext, useContext, useState } from "react";

/*
 * The selected tests used to live only in react-router location state, so they
 * were visible on the page you navigated to and nowhere else -- which is why the
 * header's cart badge read 0 almost everywhere. This holds the same list for the
 * whole session instead. Navigation state is still passed alongside it, so the
 * order page keeps working exactly as before.
 */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedTests, setSelectedTests] = useState([]);
  const clearCart = () => setSelectedTests([]);

  return (
    <CartContext.Provider value={{ selectedTests, setSelectedTests, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext) || { selectedTests: [], setSelectedTests: () => {}, clearCart: () => {} };
