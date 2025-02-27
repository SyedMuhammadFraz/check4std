import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { webApiInstance, authServerInstance } from "../AxiosInstance";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [pendingUser, setPendingUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const token = Cookies.get("authToken");
  //   setAuthToken(token || null);
  //   setLoading(false);
  // }, []);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const decodedSavedToken = decodeJWT(storedToken);
    console.log(decodedSavedToken.role);
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1]; // Extract the payload part
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const login = (token) => {
    Cookies.set("authToken", token);
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
    setAuthToken(null);
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
      return;
    }

    setLoading(true);
    try {
      const roleId = await fetchRoleId();
      if (!roleId) {
        toast.error("Failed to fetch role ID. Please try again.");
        return;
      }

      // console.log("Registering user with data:", {
      //   email: pendingUser.email,
      //   password: pendingUser.password,
      //   name: pendingUser.name,
      //   roleId: roleId,
      //   phoneNumber: pendingUser.phoneNumber,
      // });

      const response = await authServerInstance.post(
        "/UserRegistration",
        {
          email: pendingUser.email,
          password: pendingUser.password,
          name: pendingUser.name,
          roleId: roleId,
          phoneNumber: pendingUser.phoneNumber,
        },
        { withCredentials: true }
      );
      const formData = new URLSearchParams();
      formData.append("grant_type", "password");
      formData.append("username", pendingUser.email);
      formData.append("password", pendingUser.password);

      try {
        const response = await connectTokenInstance.post(
          "/connect/token",
          formData, // Pass form data here
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );

        localStorage.setItem("authToken", token);
        toast.success("Successfully signed in!");
        
      } catch {
         toast.error("Something went wrong!");
      }

      try{
        login(token);
        toast.success(response.data.message || "Registration successful!");
      }
      catch{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Registration failed.");
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
