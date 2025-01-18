import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get("authToken");
    setAuthToken(token || null);
    setLoading(false);
  }, []);

  const login = (token) => {
    Cookies.set("authToken", token);
    setAuthToken(token);
  };

  const logout = () => {
    Cookies.remove("authToken");
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ loading, authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
