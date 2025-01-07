import React, { useState, useEffect } from 'react';
import './otp.css';

const OTPPage = () => {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(120); // 2 minutes in seconds
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);

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
      console.log('OTP verified');
    } else {
      alert('Incorrect OTP');
    }
  };

  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      {isOtpSent ? (
        <div className="otp-timer">
          {timer > 0 ? (
            <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60}</p>
          ) : (
            <p>OTP Expired</p>
          )}
        </div>
      ) : (
        <button onClick={handleSendOtp} className="otp-button">
          Send OTP
        </button>
      )}

      {isOtpSent && !isOtpVerified && (
        <form onSubmit={handleVerifyOtp} className="otp-form">
          <div className="form-group">
            <label>Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength="6"
              required
            />
          </div>

          <button type="submit" className="otp-verify-button">
            Verify OTP
          </button>
        </form>
      )}

      {isOtpVerified && <p>OTP Verified Successfully!</p>}
    </div>
  );
};

export default OTPPage;
