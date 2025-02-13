import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlePasswordReset = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (!email) {
      toast.error("Please enter your email.");
      return;
    }

    setTimeout(() => {
      toast.success("Password reset link sent to your email!");
      setEmail("");
    }, 1000);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <p>Enter your email to receive a password reset link.</p>

      <form onSubmit={handlePasswordReset}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="forgot-password-button">
          Send Reset Link
        </button>
      </form>

      <button
        className="back-to-login-button"
        onClick={() => navigate("/login")}
      >
        Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
