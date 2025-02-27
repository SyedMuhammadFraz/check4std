import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader"; // Import ClipLoader
import "./otp.css";
import { useAuth } from "../../utils/AuthContext";

const OTPPage = () => {
  const { userRegister } = useAuth();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Sending OTP
  const [isVerifying, setIsVerifying] = useState(false); // Verifying OTP
  const navigate = useNavigate();

  useEffect(() => {
    let countdown;
    if (timer > 0 && isOtpSent) {
      countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(countdown);
    }

    return () => clearInterval(countdown); // Cleanup interval on component unmount
  }, [timer, isOtpSent]);

  const handleSendOtp = async () => {
    setIsLoading(true); // Start loading
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      setIsOtpSent(true);
      setTimer(120); // Reset timer
      toast.success("OTP sent successfully!");
      console.log("OTP sent to user");
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setIsVerifying(true); // Start loading
    try {
      // await new Promise((resolve) => setTimeout(resolve, 4000)); // Simulate API call
      if (otp === "123456") {
        try {
          const response = await userRegister(); // Wait for user registration
          console.log(response);
          if (response?.status === 200) {
            // Check if registration was successful
            setIsOtpVerified(true);
            toast.success("OTP verified successfully!");
            navigate("/"); // Navigate only if successful
          } else {
            toast.error("Registration failed. Please try again.");
          }
        } catch (error) {
          toast.error("Something went wrong. Please try again.");
        }
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please try again.");
    } finally {
      setIsVerifying(false); // Stop loading
    }
  };

  return (
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>

      {isOtpSent ? (
        <div className="otp-page__timer">
          {timer > 0 ? (
            <p>
              Time Remaining: {Math.floor(timer / 60)}:{timer % 60}
            </p>
          ) : (
            <p>OTP Expired</p>
          )}
        </div>
      ) : (
        <button
          onClick={handleSendOtp}
          className="otp-page__button--send"
          disabled={isLoading}
        >
          {isLoading ? <ClipLoader size={18} color="#fff" /> : "Send OTP"}
        </button>
      )}

      {isOtpSent && !isOtpVerified && (
        <form onSubmit={handleVerifyOtp} className="otp-page__form">
          <div className="otp-page__form-group">
            <label className="otp-page__form-label">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
              className="otp-page__form-input"
              disabled={isVerifying}
            />
          </div>

          <button
            type="submit"
            className="otp-page__button--verify"
            disabled={isVerifying}
          >
            {isVerifying ? <ClipLoader size={18} color="#fff" /> : "Verify OTP"}
          </button>
        </form>
      )}

      {isOtpVerified && (
        <p className="otp-page__message">OTP Verified Successfully!</p>
      )}
    </div>
  );
};

export default OTPPage;
