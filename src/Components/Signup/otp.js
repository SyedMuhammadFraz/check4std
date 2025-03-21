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
  // const { authToken } = useContext(AuthContext);
  const { userRegister } = useAuth();
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [otp, setOtp] = useState("");
  const [otpID, setOtpID] = useState("");
  const [user, setUser] = useState(null);
  const [attemptsLeft, setAttemptsLeft] = useState(3);
  const [isVerifying, setIsVerifying] = useState(false);
  const [timer, setTimer] = useState(getStoredTimer());
  const [canResend, setCanResend] = useState(timer <= 0);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          const newTime = prev - 1;
          localStorage.setItem("otpTimer", newTime);
          return newTime;
        });
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  useEffect(() => {
    const storedOtpID = localStorage.getItem("optID");
    const storedUser = localStorage.getItem("user");

    if (storedOtpID) {
      setOtpID(storedOtpID);
    }

    if (storedUser) {
      // console.log("After");
      // console.log(storedUser);
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  function getStoredTimer() {
    const storedTimestamp = localStorage.getItem("otpTimestamp");
    if (storedTimestamp) {
      const elapsed = Math.floor(
        (Date.now() - parseInt(storedTimestamp)) / 1000
      );
      return Math.max(300 - elapsed, 0);
    }
    return 300;
  }

  // const sendOtp = async () => {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
  //     toast.success("OTP sent successfully!");
  //     console.log("OTP sent to user");

  //     const newTimestamp = Date.now();
  //     localStorage.setItem("otpTimestamp", newTimestamp);
  //     localStorage.setItem("otpTimer", 300);
  //     setTimer(300);
  //     setCanResend(false);
  //   } catch (error) {
  //     toast.error("Failed to send OTP. Please try again.");
  //   }
  // };

  // const verifyOtpAPI = async (otp) => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve({ success: otp === "123456" });
  //     }, 2000);
  //   });
  // };

  // const handleVerifyOtp = async (e) => {
  //   e.preventDefault();
  //   if (otp.length !== 6) {
  //     toast.error("OTP must be 6 digits.");
  //     return;
  //   }

  //   setIsVerifying(true);
  //   try {
  //     const response = await verifyOtpAPI(otp);
  //     if (response.success) {
  //       const registerResponse = await userRegister();
  //       if (registerResponse.success) {
  //         toast.success("OTP verified & User Registered!");
  //         localStorage.removeItem("otpTimestamp"); // Clear OTP timestamp on success
  //         navigate("/");
  //       } else {
  //         toast.error("Registration failed. Try again.");
  //       }
  //     } else {
  //       setAttemptsLeft((prev) => prev - 1);
  //       toast.error(`Invalid OTP. ${attemptsLeft - 1} attempts left.`);
  //       if (attemptsLeft - 1 === 0) {
  //         toast.error("Maximum attempts reached. Please request a new OTP.");
  //       }
  //     }
  //   } catch (error) {
  //     toast.error("Error verifying OTP. Try again.");
  //   } finally {
  //     setIsVerifying(false);
  //   }
  // };

  const VerifyOTP = async () => {
    setIsVerifying(true);
    const data = qs.stringify({
      grant_type: "otp_grant",
      OtpId: otpID,
      Otp: otp,
    });
    try {
      const response = await connectTokenInstance.post("/connect/token", data, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });

      if (response.status === 200) {
        login(response.data.access_token);
        navigate("/");
      }
      else{
        toast.error("Invalid Otp. Please try again");
      }
    } catch (error) {
      console.error(
        "Error verifying OTP:",
        error.response?.data || error.message
      );
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>
      <p>
        An OTP has been sent to your email. If you dont find it in your inbox,
        please check the spam folder.
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

      <form className="otp-page__form">
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
          onClick={VerifyOTP}
        >
          {isVerifying ? <ClipLoader size={18} color="#fff" /> : "Verify OTP"}
        </button>
      </form>

      <button
        // onClick={sendOtp}
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
