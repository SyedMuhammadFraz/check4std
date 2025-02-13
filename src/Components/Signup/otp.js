import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './otp.css';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
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

  const handleSendOtp = () => {
    // Here, you would trigger the API to send OTP
    // For now, let's simulate the OTP being sent
    setIsOtpSent(true);
    setTimer(120); // Reset timer on OTP resend
    console.log('OTP sent to user');
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();

    // Simulate OTP verification (You'd compare the entered OTP with the one sent to the user)
    if (otp === '123456') {
      setIsOtpVerified(true);
      navigate("/");
      toast.success("OTP verified successfully!");
    } else {
      toast.error('Incorrect OTP');
    }
  };

  return (
    <div className="otp-page__container">
      <h2 className="otp-page__title">Enter OTP</h2>
      
      {isOtpSent ? (
        <div className="otp-page__timer">
          {timer > 0 ? (
            <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60}</p>
          ) : (
            <p>OTP Expired</p>
          )}
        </div>
      ) : (
        <button onClick={handleSendOtp} className="otp-page__button--send">
          Send OTP
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
            />
          </div>

          <button type="submit" className="otp-page__button--verify">
            Verify OTP
          </button>
        </form>
      )}

      {isOtpVerified && <p className="otp-page__message">OTP Verified Successfully!</p>}
    </div>
  );
};

export default OTPPage;
