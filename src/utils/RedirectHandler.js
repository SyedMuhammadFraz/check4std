import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
function RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);

    if (params.get("success") === "true") {
      navigate("/payment-success");
    } else if (params.get("canceled") === "true") {
      navigate("/payment-failed");
    }
  }, [location, navigate]);

  return null; // This component doesn't render anything
}

export default RedirectHandler;
