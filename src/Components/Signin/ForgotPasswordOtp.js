import React, { useState, useEffect } from "react";
import "../Signup/otp.css";
import { toast } from "react-toastify";
import { connectTokenInstance } from "../../AxiosInstance";
import { useNavigate } from "react-router-dom";
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
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>
      <p>
        An OTP has been sent to your email. If you don't see it, check the spam
        folder.
      </p>

      <form className="otp-page__form" onSubmit={OnSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
          className="otp-page__form-input"
          placeholder="Enter 6-digit OTP"
        />
        <input
          type="password"
          value={NewPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
          className="otp-page__form-input my-3"
          placeholder="Enter New Password"
        />
        <input
          type="password"
          value={ConfirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          required
          className="otp-page__form-input"
          placeholder="Confirm Password"
        />
        <button type="submit" className="otp-page__button--verify">
          Submit
        </button>
      </form>
    </div>
  );
}

export default ForgotPasswordOtp;
