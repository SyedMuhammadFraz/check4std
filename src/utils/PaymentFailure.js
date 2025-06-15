import { useSearchParams } from "react-router-dom";
import './paymentStatus.css';

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled");

  return (
    <div className="payment-status-wrapper" role="alert" aria-live="assertive">
      <div className="payment-status-box payment-failure-box">
        <h1 className="payment-status-title payment-failure-title">❌ Payment Failed</h1>
        <p className="payment-status-message">
          {canceled === "true"
            ? "You canceled the payment process."
            : "Your payment could not be processed."}
        </p>
        <a href="/" className="payment-status-link">Return to Home</a>
      </div>
    </div>
  );
};

export default PaymentFailure;
