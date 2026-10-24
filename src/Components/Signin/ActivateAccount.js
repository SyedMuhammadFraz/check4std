import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Journey/journey.css";
import { webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";
import { AuthContext } from "../../utils/AuthContext";

const PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Landing page for the activation link emailed after a guest checkout.
const ActivateAccount = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const { setLoading } = useLoader();
  const { logout } = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("This activation link is invalid.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!PASSWORD_PATTERN.test(password)) {
      toast.error(
        "Password must be at least 8 characters long with an uppercase letter, lowercase letter, number, and special character."
      );
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      await webApiInstance.post("/User/activate-account", {
        token,
        password,
        confirmPassword,
      });
      // Drop any session already in this browser (it may belong to another account),
      // so the next login is as the account that was just activated.
      logout();
      toast.success("Your account is active. Please log in.");
      navigate("/login");
    } catch (error) {
      console.error("Account activation failed:", error);
      const data = error.response?.data;
      if (!error.response) toast.error("We couldn't reach the server. Please try again.");
      else if (typeof data === "string" && data) toast.error(data);
      else if (data?.errors) toast.error(Object.values(data.errors).flat().join(" "));
      else toast.error(data?.title || "This activation link is invalid or has expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Activate your account.</h1>
          <p className="j-intro">
            Choose a password to finish setting up your account. You can then log in to see your
            orders.
          </p>

          <form className="j-panel" onSubmit={handleSubmit}>
            <div className="j-grid">
              <div>
                <label htmlFor="activate-password">New password</label>
                <input
                  id="activate-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="activate-confirm-password">Confirm password</label>
                <input
                  id="activate-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="j-hint">
              At least 8 characters, with an uppercase letter, a lowercase letter, a number and a
              special character (@$!%*?&).
            </p>
            <button type="submit">Activate account</button>
            <p className="j-auth-foot">
              <Link to="/login">Back to login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ActivateAccount;
