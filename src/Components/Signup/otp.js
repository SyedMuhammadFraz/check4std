import React, { useState, useEffect, useContext } from "react";
import qs from "qs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./otp.css";
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
  const [Resendotp , setResentOtp] = useState(false)

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
        toast.success("Email verified successfully.")
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
    console.log(user);
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
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>
      <p>
        An OTP has been sent to your email. If you don't see it, check the spam
        folder.
      </p>

      <p className="my-3">
        You must wait for <strong>2 minutes </strong>to request another OTP.
      </p>

      <form className="otp-page__form" onSubmit={VerifyOTP}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          required
          className="otp-page__form-input"
          disabled={isVerifying}
          placeholder="Enter 6-digit OTP"
        />
        <button
          type="submit"
          className="otp-page__button--verify"
          disabled={isVerifying || otp.length !== 6 || attemptsLeft === 0}
        >
          {isVerifying ? <ClipLoader size={18} color="#fff" /> : "Verify OTP"}
        </button>
      </form>

      <button onClick={resendOtp} className="otp-page__button--resend" >
      {Resendotp ? <ClipLoader size={18} color="#fff" /> : "Resend OTP"}
      </button>

      {attemptsLeft === 0 && (
        <p className="otp-page__message">
          Too many wrong attempts. Request a new OTP.
        </p>
      )}
    </div>
  );
};

export default OTPPage;
