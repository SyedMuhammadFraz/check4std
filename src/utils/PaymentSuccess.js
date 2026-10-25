import { useContext, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../Components/Journey/journey.css";
import { AuthContext } from "./AuthContext";
import { useCart } from "./CartContext";
import { CHECKOUT_TESTS_KEY, GUEST_DETAILS_KEY, removeStored } from "./checkoutStorage";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get("success");
  const { authToken } = useContext(AuthContext);
  const { clearCart } = useCart();

  // The order is paid, so the saved checkout (see Orders/order.js) is no longer needed.
  useEffect(() => {
    if (success !== "true") return;
    clearCart();
    removeStored(CHECKOUT_TESTS_KEY, GUEST_DETAILS_KEY);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  if (success !== "true") {
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
              Your payment was unsuccessful or canceled. Your order is not confirmed until payment
              succeeds.
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
  }

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-status-card" role="status" aria-live="polite">
          <div className="j-success">✓</div>
          <span className="j-tag">PAYMENT SUCCESS</span>
          <h1 className="j-title">You're all set.</h1>
          <p className="j-intro">
            Thank you for choosing Satellite Health. Your order has been placed successfully.
          </p>
          <div className="j-panel">
            <h3>Your next steps</h3>
            <div className="j-row">
              <span>1. Order confirmation &amp; receipt</span>
              <strong>Email + text</strong>
            </div>
            <div className="j-row">
              <span>2. Your test requisition</span>
              <strong>Email + text</strong>
            </div>
            <div className="j-row">
              <span>3. Results when received</span>
              <strong>Email notification</strong>
            </div>
          </div>
          {!authToken && (
            <p className="j-hint">
              Check your inbox: we've emailed the patient a link to activate their account and see
              this order.
            </p>
          )}
          <div className="j-actions">
            <Link className="j-button" to={authToken ? "/user-profile" : "/login"}>
              {authToken ? "Go to my account" : "Log in"}
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

export default PaymentSuccess;
