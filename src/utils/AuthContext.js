import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);

  useEffect(() => {
    // Load auth token from cookies when the app starts
    const token = Cookies.get("authToken");
    setAuthToken(token || null);
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
    <AuthContext.Provider value={{ authToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
