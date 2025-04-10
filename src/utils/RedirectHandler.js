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
      sessionStorage.setItem("allowSuccessPage", "true");

      setTimeout(() => {
        navigate(`/payment-success?orderId=${orderId}`);
      }, 100); // wait 100ms before navigating
    } else if (canceled === "true" && orderId) {
      sessionStorage.setItem("allowFailurePage", "true");

      setTimeout(() => {
        navigate(`/payment-failure?orderId=${orderId}`);
      }, 100); // wait 100ms before navigating
    }
  }, [location, navigate]);

  return <p>Redirecting...</p>;
};

export default RedirectHandler;
