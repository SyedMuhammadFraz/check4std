import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './paymentStatus.css';

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    const allowed = localStorage.getItem("allowSuccessPage");
    console.log("Redirecting with session flag:", localStorage.getItem("allowSuccessPage"));

    console.log(allowed)
    console.log(orderId)
    if (!allowed && orderId!==null) {
      console.log("If is running")
      navigate("/"); 
    } else {
      console.log("else is running")
      localStorage.removeItem("allowSuccessPage"); // Use-once
    }
  }, [navigate, orderId]);

  return (
    <div className="payment-status-wrapper" role="status" aria-live="polite">
      <div className="payment-status-box payment-success-box">
        <h1 className="payment-status-title payment-success-title">
          ✅ Payment Successful
        </h1>
        <p className="payment-status-message">
          Your order has been placed successfully. You’ll receive a confirmation email shortly.
        </p>
        <a href="/" className="payment-status-link">Back to Home</a>
      </div>
    </div>
  );
};

export default PaymentSuccess;
