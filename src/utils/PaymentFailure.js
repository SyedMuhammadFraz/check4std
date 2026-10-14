import { Link, useSearchParams } from "react-router-dom";
import "../Components/Journey/journey.css";

const PaymentFailure = () => {
  const [searchParams] = useSearchParams();
  const canceled = searchParams.get("canceled");

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-status-card" role="alert" aria-live="assertive">
          <div className="j-status-symbol j-status-symbol--failed">!</div>
          <span className="j-tag">PAYMENT FAILED</span>
          <h1 className="j-title">
            Payment couldn't
            <br />
            be completed.
          </h1>
          <p className="j-intro">
            {canceled === "true"
              ? "You canceled the payment process. Your order is not confirmed until payment succeeds."
              : "Your payment could not be processed. Your order is not confirmed until payment succeeds."}
          </p>
          <div className="j-panel">
            <h3>What you can do</h3>
            <p className="j-hint">
              Check your card details, try a different payment method, or contact your card
              provider. Nothing has been charged.
            </p>
          </div>
          <div className="j-actions">
            <Link className="j-button" to="/price-packages">
              Return to checkout
            </Link>
            <Link className="j-button j-button--secondary" to="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentFailure;
