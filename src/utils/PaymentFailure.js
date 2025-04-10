import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './paymentStatus.css';

const PaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const allowed = sessionStorage.getItem("allowFailurePage");

    if (!allowed || !orderId) {
      navigate("/"); // Redirect if accessed directly
    } else {
      sessionStorage.removeItem("allowFailurePage"); // One-time use
    }
  }, [navigate, orderId]);

  return (
    <div className="payment-status-wrapper" role="alert" aria-live="assertive">
      <div className="payment-status-box payment-failure-box">
        <h1 className="payment-status-title payment-failure-title">
          ❌ Payment Failed
        </h1>
        <p className="payment-status-message">
          Your payment could not be processed. Please try again or contact support.
        </p>
        <a href="/" className="payment-status-link">Back to Home</a>
      </div>
    </div>
  );
};

export default PaymentFailure;
