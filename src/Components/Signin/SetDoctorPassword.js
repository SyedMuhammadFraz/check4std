import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import "../Journey/journey.css";
import { connectTokenInstance, webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";

const SetDoctorPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token"); // Token from URL

  const { setLoading } = useLoader();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing token.");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await webApiInstance.post(
        "/Doctor/set-password",
        {
          token: token, // send the encrypted payload from URL
          password: password,
          confirmPassword: confirmPassword,
        }
      );
      if (response.status === 200) {
        toast.success("Password set successfully! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(error.response?.data || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Set your password.</h1>
          <p className="j-intro">
            Create a password to activate your account. Use at least 6 characters.
          </p>

          <form className="j-panel" onSubmit={handleSubmit}>
            <div className="j-grid">
              <div>
                <label htmlFor="set-password">New password</label>
                <input
                  id="set-password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="set-confirm-password">Confirm password</label>
                <input
                  id="set-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <button type="submit">Set password</button>
            <p className="j-auth-foot">
              <Link to="/login">Back to login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SetDoctorPassword;
