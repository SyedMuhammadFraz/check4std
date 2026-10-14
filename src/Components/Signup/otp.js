import React, { useState, useEffect, useContext } from "react";
import qs from "qs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "../Journey/journey.css";
import { AuthContext } from "../../utils/AuthContext";
import { connectTokenInstance } from "../../AxiosInstance";

const OTPPage = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [otpID, setOtpID] = useState("");
  const [user, setUser] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isVerifying, setIsVerifying] = useState(false);
  const [Resendotp, setResentOtp] = useState(false);

  useEffect(() => {
    setOtpID(localStorage.getItem("optID"));
    setUser(localStorage.getItem("email"));
  }, []);

  const VerifyOTP = async (e) => {
    e.preventDefault();
    setIsVerifying(true);
    const data = qs.stringify({
      grant_type: "otp_grant",
      OtpId: otpID,
      Otp: otp,
    });

    try {
      const response = await connectTokenInstance.post("/connect/token", data, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.status === 200) {
        login(response.data.access_token);
        toast.success("Email verified successfully.");
        navigate("/");
      } else {
        toast.error("Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error(`Invalid OTP. ${attemptsLeft} Attempts Left.`);
      setAttemptsLeft((prev) => prev - 1);
    } finally {
      setIsVerifying(false);
    }
  };

  const resendOtp = async (event) => {
    event.preventDefault();
    setResentOtp(true);
    try {
      const response = await connectTokenInstance.post(
        `/api/UserRegistration/request-otp/${user}`
      );
      if (response.status === 200) {
        setOtpID(response.data);
        toast.success("OTP Resent!");
      }
    } catch (error) {
      if (error.response.status === 400) {
        toast.error("You must wait to get another otp.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setResentOtp(false);
    }
  };

  return (
    <section className="sh-journey">
      <div className="j-shell">
        <div className="j-auth-shell">
          <div className="j-eyebrow">SATELLITE HEALTH · ACCOUNT</div>
          <h1 className="j-title">Verify your email.</h1>
          <p className="j-intro">
            Enter the six-digit code we sent to your email address. If you don't see it, check your
            spam folder.
          </p>

          <form className="j-panel" onSubmit={VerifyOTP}>
            <div className="j-grid">
              <div className="j-full">
                <label htmlFor="otp-code">Verification code</label>
                <input
                  id="otp-code"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength="6"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  disabled={isVerifying}
                  required
                />
              </div>
            </div>
            <p className="j-hint">
              You must wait <strong>2 minutes</strong> before requesting another code.
            </p>
            {attemptsLeft === 0 && (
              <p className="j-error" role="alert">
                Too many wrong attempts. Request a new code.
              </p>
            )}
            <button
              type="submit"
              disabled={isVerifying || otp.length !== 6 || attemptsLeft === 0}
            >
              {isVerifying ? <ClipLoader size={18} color="#fff" /> : "Verify code"}
            </button>
            <p className="j-auth-foot">
              <button type="button" className="j-button j-button--text" onClick={resendOtp}>
                {Resendotp ? "Sending…" : "Resend code"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default OTPPage;
