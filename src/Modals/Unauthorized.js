import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Components/Journey/journey.css";

export default function UnauthorizedRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-status-card" role="alert" aria-live="assertive">
          <div className="j-status-symbol">403</div>
          <span className="j-tag">UNAUTHORIZED ACCESS</span>
          <h1 className="j-title">This page requires access.</h1>
          <p className="j-intro">
            Log in with the account associated with this order or result. If you're already logged
            in, check that you're using the correct account.
          </p>
          <p className="j-hint">Taking you to the login page…</p>
          <div className="j-actions">
            <Link className="j-button" to="/login">
              Go to login
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
