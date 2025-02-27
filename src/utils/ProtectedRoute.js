import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { decodeJWT } from "./JWTDecoder";

const ProtectedRoute = ({ allowedRoles, children }) => {
  console.log("Allowed Roles:", allowedRoles); // ✅ Debugging
  const { authToken } = useAuth();

  if (!authToken) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = decodeJWT(authToken);
    console.log("Decoded Token:", decodedToken); // ✅ Debugging

    const role = decodedToken?.role;
    console.log("User Role:", role); // ✅ Debugging

    if (!role) {
      console.error("Role is undefined");
      return <Navigate to="/login" />;
    }

    if (Array.isArray(allowedRoles) && !allowedRoles.includes(role)) {  
      return <Navigate to="/unauthorized" />;
    }
    
    return children ? children : <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
