import React, { useState, useEffect } from "react";
import "../Journey/journey.css";
import { toast } from "react-toastify";
import { connectTokenInstance } from "../../AxiosInstance";
import { Link, useNavigate } from "react-router-dom";
import { useLoader } from "../../utils/LoaderContext";

function ForgotPasswordOtp() {
  const [otp, setOtp] = useState("");
  const [otpId, setOtpId] = useState(null);
  const { setLoading } = useLoader();
  const [NewPassword, setNewPassword] = useState("");
  const navigate = useNavigate();
  const [ConfirmNewPassword, setConfirmNewPassword] = useState("");
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  useEffect(() => {
    setOtpId(localStorage.getItem("User-Otp"));
  }, []);

  const OnSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (NewPassword !== ConfirmNewPassword) {
      toast.error("Passwords do not match");
      setLoading(false);
      return false;
    }
    if (!passwordRegex.test(NewPassword)) {
      toast.error(
        "Password must be at least 8 characters long with an uppercase letter, lowercase letter, number, and special character."
      );
      setLoading(false);
      return false;
    }
    try {
      const requestData = {
        otpId: otpId,
        otp: otp,
        password: NewPassword,
        confirmPassword: ConfirmNewPassword,
      };
      const response = await connectTokenInstance.post(
        `/api/UserRegistration/reset-password`,
        requestData
      );
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        setLoading(false);
        navigate("/");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      if (err.response.status === 500) {
        toast.error("Otp is expired. Please try again.");
        navigate("/forgot-password")
      }
    }
    setLoading(false);
  };
  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Choose a new password.</h1>
          <p className="j-intro">
            Enter the six-digit code we sent to your email, then set your new password. If you
            don't see the code, check your spam folder.
          </p>

          <form className="j-panel" onSubmit={OnSubmit}>
            <div className="j-grid">
              <div className="j-full">
                <label htmlFor="reset-otp">Verification code</label>
                <input
                  id="reset-otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="reset-new-password">New password</label>
                <input
                  id="reset-new-password"
                  type="password"
                  autoComplete="new-password"
                  value={NewPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="reset-confirm-password">Confirm new password</label>
                <input
                  id="reset-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  value={ConfirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            <p className="j-hint">
              Use at least 8 characters with an uppercase letter, a lowercase letter, a number and
              a special character.
            </p>
            <button type="submit">Reset password</button>
            <p className="j-auth-foot">
              <Link to="/login">Back to login</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPasswordOtp;
