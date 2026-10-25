import React, { createContext, useContext, useState, useCallback } from "react";
import { CHECKOUT_TESTS_KEY, readStored, writeStored } from "./checkoutStorage";

/*
 * The selected tests used to live only in react-router location state, so they
 * were visible on the page you navigated to and nowhere else -- which is why the
 * header's cart badge read 0 almost everywhere. This holds the same list for the
 * whole session instead. Navigation state is still passed alongside it, so the
 * order page keeps working exactly as before.
 */
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [selectedTests, updateSelectedTests] = useState(() => readStored(CHECKOUT_TESTS_KEY, []));
  const setSelectedTests = useCallback((tests) => {
    updateSelectedTests(tests);
    writeStored(CHECKOUT_TESTS_KEY, tests);
  }, []);
  const clearCart = useCallback(() => setSelectedTests([]), [setSelectedTests]);

  return (
    <CartContext.Provider value={{ selectedTests, setSelectedTests, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext) || { selectedTests: [], setSelectedTests: () => {}, clearCart: () => {} };
