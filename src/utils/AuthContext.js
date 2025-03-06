import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import {
  webApiInstance,
  authServerInstance,
  connectTokenInstance,
} from "../AxiosInstance";
import { toast } from "react-toastify";
import { decodeJWT } from "./JWTDecoder";
import { LocationContext } from "./LocationContext";
import { useLocation } from "./LocationContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  console.log(LocationContext);
  // const { resetLocation } = useLocation();
  // useEffect(() => {
  //   console.log("Auth Token changed, resetting location...");
  
  //   resetLocation(); // Call resetLocation when authToken changes
  
  // }, []);
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log("LocationContext:", resetLocation); // ✅ Debugging

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);
  useEffect(() => {
    let storedToken = Cookies.get("authToken");

    if (!storedToken) {
      storedToken = localStorage.getItem("authToken");
    }

    if (storedToken) {
      setAuthToken(storedToken);
      try {
        const decodedData = decodeJWT(storedToken);
        setUserRole(decodedData.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    Cookies.set("authToken", token, { expires: 2 });
    localStorage.setItem("authToken", token);
    setAuthToken(token);

    try {
      const decodedData = decodeJWT(token);
      const role = decodedData.role;
      setUserRole(role);
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  };

  const logout = () => {
    Cookies.remove("authToken");
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUserRole(null);
    // resetLocation();
  };

  const fetchRoleId = async () => {
    try {
      const roleResponse = await webApiInstance.get("/Role/get-by-name/user", {
        withCredentials: true,
      });
      return roleResponse.data.result?.roleId || null;
    } catch (error) {
      console.error("Error fetching role ID:", error);
      return null;
    }
  };

  const userRegister = async () => {
    if (!pendingUser) {
      toast.error("No user data found. Please sign up again.");
      return { success: false, message: "No user data found." };
    }

    setLoading(true);
    try {
      const roleId = await fetchRoleId();
      if (!roleId) {
        toast.error("Failed to fetch role ID. Please try again.");
        return { success: false, message: "Failed to fetch role ID." };
      }

      // Register User
      const registrationResponse = await authServerInstance.post(
        "/UserRegistration",
        {
          email: pendingUser.email,
          password: pendingUser.password,
          name: pendingUser.name,
          roleId: roleId,
          phoneNumber: pendingUser.phoneNumber,
          dob: pendingUser.dob,
        },
        { withCredentials: true }
      );

      if (registrationResponse.status !== 200) {
        toast.error("Registration failed. Please try again.");
        return { success: false, message: "Registration failed." };
      }

      // Prepare login data
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", pendingUser.email);
      formData.append("password", pendingUser.password);

      // Get access token
      try {
        const tokenResponse = await connectTokenInstance.post(
          "/connect/token",
          formData,
          { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        );

        if (tokenResponse.data.access_token) {
          const token = tokenResponse.data.access_token;
          login(token);
          return {
            success: true,
            message: "Registration and login successful!",
            token,
          };
        } else {
          toast.error("Sign in to continue.");
          return {
            success: false,
            message: "Sign in failed. No token received.",
          };
        }
      } catch (error) {
        toast.error("Something went wrong while signing in.");
        return { success: false, message: "Token request failed.", error };
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed.",
        error,
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        authToken,
        userRole,
        login,
        logout,
        pendingUser,
        setPendingUser,
        userRegister,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);