import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { decodeJWT } from "./JWTDecoder";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ allowedRoles }) => {
  const { authToken } = useAuth();
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (authToken) {
      try {
        const decodedToken = decodeJWT(authToken);
        setRole(decodedToken?.role);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [authToken]);

  console.log("Auth Token:", authToken);  // ✅ Check if token is there
  console.log("Decoded Role:", role);    // ✅ Check if role is updated

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  if (!role) {
    return <div>Loading...</div>;  // ✅ Prevent redirection until role is available
  }

  if (!allowedRoles.includes(role)) {  
    console.warn(`🔴 Unauthorized access. Role: ${role}`);
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
