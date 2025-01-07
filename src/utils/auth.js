// src/utils/auth.js
import Cookies from "js-cookie";

// Check if the user is logged in
export const isLoggedIn = () => {
  return !!Cookies.get("authToken"); 
};

// Mock login function (stores a token)
export const login = (token) => {
  Cookies.set("authToken", token, { expires: 1 });
};

// Logout function (removes the token)
export const logout = () => {
  Cookies.remove("authToken");
};
