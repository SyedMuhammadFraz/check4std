import React, { useState, useEffect, useContext } from "react";
import qs from "qs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import "./otp.css";
import { useAuth } from "../../utils/AuthContext";
import { AuthContext } from "../../utils/AuthContext";
import { connectTokenInstance } from "../../AxiosInstance";

const OTPPage = () => {
  const { userRegister } = useAuth();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [otpID, setOtpID] = useState("");
  const [user, setUser] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Function to get the remaining timer from localStorage
  const getStoredTimer = () => {
    const storedTimestamp = localStorage.getItem("otpTimestamp");
    if (storedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(storedTimestamp)) / 1000
      );
      return Math.max(30 - elapsed, 0);
    }
    return 30; // Default to 30 seconds if no timestamp is stored
  };

  useEffect(() => {
    const storedTimestamp = localStorage.getItem("otpTimestamp");

    if (storedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(storedTimestamp)) / 1000
      );
      const remainingTime = Math.max(30 - elapsed, 0);

      setTimer(remainingTime);
      setCanResend(remainingTime === 0);
    }

    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(countdown);
            setCanResend(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
    console.log("Timer: " + timer);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      setCanResend(false);
      const countdown = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("otpTimer", newTime);
          if (newTime <= 0) {
            setCanResend(true);
            clearInterval(countdown);
          }
          return newTime;
        });
      }, 1000);

      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

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

  const resendOtp = async () => {
    if (!user?.email) {
      toast.error("User email not found!");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await connectTokenInstance.post(
        `/api/UserRegistration/request-otp/${user.email}`
      );
      console.log(response);
      toast.success("OTP Resent!");

      // Reset timer
      const newTimestamp = Date.now();
      localStorage.setItem("otpTimestamp", newTimestamp);
      setTimer(30);
      setCanResend(false);
    } catch (error) {
      console.error(
        "Error requesting OTP:",
        error.response?.data || error.message
      );
      toast.error("Error sending OTP. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>
      <p>
        An OTP has been sent to your email. If you don't see it, check the spam
        folder.
      </p>

      <div className="otp-page__timer">
        {timer > 0 ? (
          <p>
            Resend in: {Math.floor(timer / 60)}:
            {String(timer % 60).padStart(2, "0")}
          </p>
        ) : (
          <p>You can request a new OTP</p>
        )}
      </div>

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

      <button
        onClick={resendOtp}
        className="otp-page__button--resend"
        disabled={!canResend}
      >
        Resend OTP
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
