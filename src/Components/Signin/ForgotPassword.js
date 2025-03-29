import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./ForgotPassword.css";
import { connectTokenInstance, webApiInstance } from "../../AxiosInstance";
import { useLoader } from "../../utils/LoaderContext";

const ForgotPassword = () => {
  const { setLoading } = useLoader();
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [user, SetUser] = useState(null);

  const ResetLogin = async (event) => {
    event.preventDefault(); // Prevent form refresh
    setLoading(true);
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      toast.error("Invalid email address");
      return;
    }

    try {
      // const checkUser = await webApiInstance.get(
      //   `/User/get-by-email?email=${encodeURIComponent(email)}`
      // );

      // if (checkUser.status === 200) {
        // User exists
        // SetUser(checkUser.data.result);
        // localStorage.setItem("User", checkUser.data.result);
        // Perform further actions here
        try {
          const response = await connectTokenInstance.post(
            `/api/UserRegistration/request-otp/${email}`
          );
          if(response.status === 200)
          {
            localStorage.setItem("User-Otp" , response.data);
            setLoading(false);
            navigate("/forgot-password-otp")
          }
        } catch (err) {
          setLoading(false);
          if(err.response.status === 400)
          {
            toast.error("You must wait to get another otp.")
          }
          else
          {
            toast.error("Something went wrong. Please try again.")
          }
        }
      // }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 404) {
        toast.error("This email does not have any user.");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password?</h2>
      <p>Enter your email to receive a password reset link.</p>

      <form onSubmit={ResetLogin}>
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
