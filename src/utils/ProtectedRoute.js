import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { decodeJWT } from "./JWTDecoder";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { authToken, userRole, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ClipLoader size={50} color="#36d7b7" />
      </div>
    );
  }

  try {
    const decodedToken = decodeJWT(authToken);

    const role1 = decodedToken?.role;
    
    if (role1 == null) {
      return <Navigate to="/login" />;
    }

    if (Array.isArray(allowedRoles) && !allowedRoles.includes(role1)) {
      return <Navigate to="/unauthorized" />;
    }

    return children ? children : <Outlet />;
  } catch (error) {
    console.error("Error decoding token:", error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
