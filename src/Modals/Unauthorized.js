import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Unauthorized.css";

export default function UnauthorizedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-box">
        <h1 className="unauthorized-title">Access Denied</h1>
        <p className="unauthorized-text">You are not authorized to view this page.</p>
        <p className="unauthorized-text">Redirecting to login...</p>
        <button
          onClick={() => navigate("/login")}
          className="unauthorized-button"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}
