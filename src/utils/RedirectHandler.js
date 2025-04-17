import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const RedirectHandler = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get("success");
    const canceled = params.get("canceled");
    const orderId = params.get("orderId");
  
    if (success === "true" && orderId) {
      // Set the flag first
      sessionStorage.setItem("allowSuccessPage", "true");
      console.log("Setting allowSuccessPage to true for orderId:", orderId);
  
      // Then navigate after a short delay
      setTimeout(() => {
        navigate(`/payment-success`);
      }, 200); // Slightly longer delay
    } else if (canceled === "true" && orderId) {
      sessionStorage.setItem("allowFailurePage", "true");
      console.log("Setting allowFailurePage to true for orderId:", orderId);
  
      setTimeout(() => {
        navigate(`/payment-failed`);
      }, 200);
    }
  }, [location, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
